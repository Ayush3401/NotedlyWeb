import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm'
import { GET_MY_NOTES, GET_NOTES } from '../gql/query'
import { NEW_NOTE } from '../gql/mutation'

const NewNote = () => {
    useEffect(() => {
        // update the document title
        document.title = 'New Note — Notedly'
    })
    const navigate = useNavigate()
    const [newnote, { loading, error }] = useMutation(NEW_NOTE, {
        onCompleted: (data) => {
            navigate(`/note/${data.newNote.id}`)
        },
        refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    })
    return (
        <>
            <NoteForm action={newnote} />
            {loading && <p>Loading...</p>}
            {error && <p>Error Submitting Note!</p>}
        </>
    )
}
export default NewNote
