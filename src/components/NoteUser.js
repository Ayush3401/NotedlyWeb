import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { GET_ME } from '../gql/query'
import DeleteNote from './DeleteNote'
import FavouriteNote from './FavouriteNote'

const NoteUser = ({ note }) => {
    const { data, loading, error } = useQuery(GET_ME)
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <>
            <FavouriteNote
                me={data.me}
                noteId={note.id}
                favouriteCount={note.favouriteCount}
            />
            <br />
            {data.me.id === note.author.id && (
                <>
                    <Link to={`/note/${note.id}/edit`}>Edit</Link>
                    <br />
                    <DeleteNote noteId={note.id} />
                </>
            )}
        </>
    )
}

NoteUser.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        author: PropTypes.shape({
            id: PropTypes.string,
        }),
        favouriteCount: PropTypes.number,
    }),
}

NoteUser.defaultProps = {
    note: {},
}
export default NoteUser
