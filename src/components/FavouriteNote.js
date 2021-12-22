import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import ButtonAsLink from './ButtonAsLink'
import { TOGGLE_FAVORITE } from '../gql/mutation'
import { GET_MY_FAVORITES } from '../gql/query'

const FavouriteNote = ({ me, favouriteCount, noteId }) => {
    const [isFavourite, setFavourite] = useState(
        me.favourites.filter((note) => note.id === noteId).length > 0
    )
    const [count, setCount] = useState(favouriteCount)
    const [togglefavourite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: noteId,
        },
        refetchQueries: [{ query: GET_MY_FAVORITES }],
    })
    const toggleFavourite = () => {
        setCount((prevState) => (isFavourite ? prevState - 1 : prevState + 1))
        setFavourite((prevState) => !prevState)
        togglefavourite().then(() => {})
    }

    return (
        <>
            <ButtonAsLink onClick={toggleFavourite}>
                {isFavourite ? 'Remove favourite' : 'Add favourite'}
            </ButtonAsLink>
            <br /> Favourite Count : {count}
        </>
    )
}

FavouriteNote.propTypes = {
    me: PropTypes.shape({
        favourites: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    favouriteCount: PropTypes.number.isRequired,
    noteId: PropTypes.string.isRequired,
}
export default FavouriteNote
