import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from '../components/Header/Header'
import LinkList from '../components/LinkList/LinkList'
import CreateLink from '../components/CreateLink/CreateLink'
import Login from '../components/Login/Login'
import Search from '../components/Search/Search'

import logo from '../logo.svg';
import './App.css';

const App = () => (
	<div className="center w85">
		<Header />
		<div className="ph3 pv1 background-gray">
			<Switch>
				<Route exact path="/" component={LinkList} />
				<Route exact path="/create" component={CreateLink} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/search" component={Search} />
			</Switch>
		</div>
		
	</div>

)
export default App;
