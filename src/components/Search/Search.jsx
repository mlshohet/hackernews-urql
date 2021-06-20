import React, { useState, useCallback } from 'react'
import { useQuery } from 'urql'
import gql from 'graphql-tag'
import Link from '../Link/Link'

const FEED_SEARCH_QUERY = gql`
	query FeedSearchQuery($filter: String!) {
		feed(filter: $filter) {
			links {
				id
				url
				description
				createdAt
				postedBy {
					id
					name
				}
				votes {
					id
					user {
						id
					}
				}
			}
		}
	}
`

const Search = () => {
	const [filter, setFilter] = useState('')

	const [result, executeQuery] = useQuery({
		query: FEED_SEARCH_QUERY,
		variables: { filter },
		pause: true
	})

	const search = useCallback(() => {
		executeQuery();
	}, [executeQuery])

	const links = result.data ? result.data.feed.links : []
	console.log("links: ", links)

	return (
		<div>
			<div>
				Search
				<input 
					className="ma2"
 					type="text"
 					onChange={e => setFilter(e.target.value)}
				/>
				<button onClick={search}>
					search
				</button>
			</div>
			{links.map((link, index) => (
					<Link key={link.id} link={link} index={index} />
				)
			)}
		</div>
	)
}

export default Search
