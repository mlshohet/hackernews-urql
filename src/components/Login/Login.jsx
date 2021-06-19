import React, { useState, useCallback } from 'react'

import gql from 'graphql-tag'
import { useMutation } from 'urql'

import { setToken } from '../../utils/token';

const SIGNUP_MUTATION = gql`
	mutation SignupMutation($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`

const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

const Login = props => {
	console.log(props);
	const [isLogin, setIsLogin] = useState(true)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const [state, executeMutation] = useMutation(
		isLogin ? LOGIN_MUTATION : SIGNUP_MUTATION
	)

	const mutate = useCallback(() => {
		console.log(email, password, name);
		executeMutation({ email, password, name })
			.then(({ data }) => {
				const token = data && data[isLogin ? 'login' : 'signup'].token
				if (token) {
					setToken(token)
					props.history.push('/')
				}
			});
		}, [executeMutation, props.history, isLogin, email, password, name])

	return (
		<div>
			<h4 className="mv3">
 				{
 					isLogin ?
		 				'Login' :
		 				'Sign Up'
		 		}
			</h4>
			<div className="flex flex-column">
				{!isLogin && (
					<input 
						className="mb2"
						type="text"
						placeholder="Your Name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				)}
				<input 
					className="mb2"
					type="email" 
					placeholder="Your email address"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input 
					className="mb2"
					type="password" 
					placeholder="Choose a password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<div className="flex mt3">
				<button
					type="button"
					className="pointer mr2 button"
					disabled={state.fetching}
					onClick={mutate}
				>
					{isLogin ? "login" : "create account"}
				</button>
				<button
					type="button"
					className="pointer button"
					disabled={state.fetching}
					onClick={() => setIsLogin(!isLogin)}
				>
					{isLogin ? 'need to create an account' : 'already have an account?'}
				</button>
			</div>
		</div>
	)
}

export default Login



