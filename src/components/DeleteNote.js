import React from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import ButtonAsLink from './ButtonAsLink'
import { DELETE_NOTE } from '../gql/mutation'
import { GET_MY_FAVORITES, GET_MY_NOTES, GET_NOTES } from '../gql/query'

const DeleteNote = ({ noteId }) => {
    const navigate = useNavigate()
    const [deletnote] = useMutation(DELETE_NOTE, {
        variables: {
            id: noteId,
        },
        refetchQueries: [
            { query: GET_MY_NOTES },
            { query: GET_MY_FAVORITES },
            { query: GET_NOTES },
        ],
        onCompleted: () => {
            navigate('/mynotes')
        },
    })
    return <ButtonAsLink onClick={deletnote}>Delete Note</ButtonAsLink>
}

DeleteNote.propTypes = {
    noteId: PropTypes.string.isRequired,
}

export default DeleteNote
