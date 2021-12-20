import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import NoteFeed from '../components/NoteFeed'
import Button from '../components/Button'

const GET_NOTES = gql`
    query NoteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                favouriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`

const Home = () => {
    useEffect(() => {
        document.title = 'Notedly'
    })

    const { data, loading, error, fetchMore } = useQuery(GET_NOTES)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    return (
        <>
            <NoteFeed notes={data.noteFeed.notes} />
            {data.noteFeed.hasNextPage && (
                <Button
                    onClick={() => {
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor,
                            },
                            updateQuery: (
                                previousResult,
                                { fetchMoreResult }
                            ) => ({
                                noteFeed: {
                                    cursor: fetchMoreResult.noteFeed.cursor,
                                    hasNextPage:
                                        fetchMoreResult.noteFeed.hasNextPage,
                                    notes: [
                                        ...previousResult.noteFeed.notes,
                                        ...fetchMoreResult.noteFeed.notes,
                                    ],
                                    __typename: 'noteFeed',
                                },
                            }),
                        })
                    }}
                >
                    Load More
                </Button>
            )}
        </>
    )
}
export default Home
