import React, { useCallback } from 'react'

import gql from 'graphql-tag'
import { useMutation } from 'urql'

import { getToken } from '../../utils/token'
import { timeDifferenceForDate } from '../../utils/dates'

const VOTE_MUTATION = gql`
	mutation VoteMutation($linkId: ID!) {
		vote(linkId: $linkId) {
			link {
				id
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

const Link = ({ index, link }) => {
	const [state, executeMutation] = useMutation(VOTE_MUTATION)

	const isLoggedIn = !!getToken()

	const upvote = useCallback(() => {
		if (!state.fetching) {
			executeMutation({ linkId: link.id })
		}
	}, [state.fetching, executeMutation, link.id])

	return (
		<div className="flex mt2 items-start">
			<div className="flex items-center">
				<span className="gray">{index + 1}</span>
				{
					isLoggedIn && (
						<div
							className="ml1 gray f11 pointer"
							onClick={upvote}
						>
							&#9650;
						</div>
					)
				}
			</div>
			<div className="ml1">
				<div>
					{link.description} ({link.url})
				</div>
				<div className="f6 lh-copy gray">
					{link.votes.length} votes by {' '}
					{link.postedBy
						? link.postedBy.className
						: 'Unknown'
					}{' '}
					{timeDifferenceForDate(link.createdAt)}
				</div>
			</div>
		</div>
	)
}

export default Link