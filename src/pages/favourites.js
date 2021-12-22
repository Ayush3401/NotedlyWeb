import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_FAVORITES } from '../gql/query'
import NoteFeed from '../components/NoteFeed'

const Favorites = () => {
    useEffect(() => {
        document.title = 'Favorites — Notedly'
    })
    const { data, loading, error } = useQuery(GET_MY_FAVORITES)
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    if (data.me.favourites.length)
        return <NoteFeed notes={data.me.favourites} />
    return <p>No Favourites yet</p>
}
export default Favorites
