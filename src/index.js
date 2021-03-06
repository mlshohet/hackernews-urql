import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { getToken } from './utils/token'

import './index.css';
import App from './containers/App';

import { Provider, Client, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache'
import { FEED_QUERY } from './components/LinkList/LinkList'

const cache = cacheExchange({
	keys: {
		Feed: () => null,
	},
	updates: {
		Mutation: {
			post: ({ post }, _args, cache) => {
				const variables = {first: 10, skip: 0, orderBy: 'createdAt_DESC'}
				cache.updateQuery({ query: FEED_QUERY, variables }, data => {
					if (data !== null) {
						data.feed.links.unshift(post)
						data.feed.count++
						return data
					} else {
						return null
					}
				})
			}
		}
	}
})

const client = new Client({
	url: 'http://localhost:4000',
	fetchOptions: () => {
		const token = getToken()
		return {
			headers: { authorization: token ? `Bearer ${token}` : '' }
		}
	},
	exchanges: [dedupExchange, cache, fetchExchange],
})

ReactDOM.render(
	<BrowserRouter>
		<Provider value={client}>
	    	<App />
	    </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);