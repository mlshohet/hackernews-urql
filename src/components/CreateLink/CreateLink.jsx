import React from 'react'

import gql from 'graphql-tag'
import { useMutation } from 'urql'

const POST_MUTATION = gql`
	mutation PostMutation($description: String!, $url: String!) {
		post(description: $description, url: $url) {
			id
			createdAt
			url
			description
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
`
console.log("gql:",POST_MUTATION)

const CreateLink = props => {
	console.log("props:",props)
	const [description, setDescription] = React.useState('')
	const [url, setUrl] = React.useState('')

	const [state, executeMutation] = useMutation(POST_MUTATION)

	const submit = React.useCallback(() => {
		console.log(description, url, state);
		executeMutation({ url, description }).then(() => {
			props.history.push('/')
		})
	}, [executeMutation, url, description, state, props.history])

	return (
		<div>
			<div className="flex flex-column mt3">
				<input
					type="text"
				  	className="ml2 mb2"  
				  	value={description}
				  	onChange={e => setDescription(e.target.value)}
				  	placeholder="A description for the link"
				/>
				<input 
					type="text" 
					className="ml2 mb2"
					value={url}
					onChange={e => setUrl(e.target.value)}
					placeholder="The URL of the link"
				/>
			</div>
			<button 
				disabled={state.fetching}
				onClick={submit}
				className="ml2"
			>
				Submit
			</button>
		</div>
	)
}

export default CreateLink