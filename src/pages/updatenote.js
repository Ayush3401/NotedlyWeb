import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_ME, GET_NOTE } from '../gql/query'
import NoteForm from '../components/NoteForm'
import { EDIT_NOTE } from '../gql/mutation'

const UpdateNote = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } })
    const {
        data: userdata,
        error: usererror,
        loading: userloading,
    } = useQuery(GET_ME)
    const [updatenote] = useMutation(EDIT_NOTE, {
        variables: {
            id,
        },
        onCompleted: () => {
            navigate(`/note/${id}`)
        },
    })

    if (loading || userloading) return <p>Loading...</p>
    if (error || usererror) return <p>Error!</p>

    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>
    }

    return <NoteForm content={data.note.content} action={updatenote} />
}
export default UpdateNote
