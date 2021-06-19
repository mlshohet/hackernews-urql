import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { getToken, deleteToken } from '../../utils/token'

const Header = props => {

	const token = localStorage.getItem('auth-token');
	console.log("token from header: ", token);
	const isLoggedIn = !!token;

	return (
		<div className="flex pa1 justify-between nowrap orange">
			<div className="flex flex-fixed black">
				<div className="fw7 mr1">
					Hacker News
				</div>
				<Link to="/" className="ml1 no-underline black">
					new
				</Link>
				{isLoggedIn && (
					<div className="flex">
						<div className="ml1">|</div>
							<Link
								to="/create"
								className="ml1 no-underline black"
							>
								submit
							</Link>
					</div>
				)}	
			</div>
			<div className="flex flex-fixed">
				{isLoggedIn ? (
						<div
							className="ml1 pointer black"
							onClick={() => {
								deleteToken()
								props.history.push("/")
							}}
						>
							logout	
						</div>
					) : (
						<Link
							to="/login"
							className="ml1 no-underline black"
						>
							login
						</Link>
					)}
			</div>
		</div>
	)
}

export default withRouter(Header)