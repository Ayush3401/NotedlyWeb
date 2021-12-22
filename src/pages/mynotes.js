import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_NOTES } from '../gql/query'
import NoteFeed from '../components/NoteFeed'

const MyNotes = () => {
    useEffect(() => {
        document.title = 'My Notes — Notedly'
    })
    const { data, loading, error } = useQuery(GET_MY_NOTES)
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    if (data.me.notes.length) return <NoteFeed notes={data.me.notes} />
    return <p>No Notes Yet</p>
}

export default MyNotes
