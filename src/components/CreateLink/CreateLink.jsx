import React from 'react'

import gql from 'graphql-tag'
import { useMutation } from 'urql'

const POST_MUTATION = gql`
	mutation PostMutation($description: String!, $url: String!) {
		post(description: $description, url: $url) {
			id
			createdAt
			urldescription
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

const CreateLink = props => {
	const [description, setDescription] = React.useState('')
	const [url, setUrl] = React.useState('')

	const [state, executeMutation] = useMutation(POST_MUTATION)

	const submit = React.useCallback(() => {
		executeMutation({ url, description })
	}, [executeMutation, url, description])

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