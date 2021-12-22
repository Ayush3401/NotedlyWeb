import { gql } from '@apollo/client'

const EDIT_NOTE = gql`
    mutation updateNote($id: ID!, $content: String!) {
        updateNote(id: $id, content: $content) {
            id
            content
            createdAt
            favouriteCount
            favouritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`

const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id)
    }
`

const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favouriteCount
            favouritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`
const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`

const TOGGLE_FAVORITE = gql`
    mutation toggleFavourite($id: ID!) {
        toggleFavourite(id: $id) {
            id
            favouriteCount
        }
    }
`

export {
    EDIT_NOTE,
    DELETE_NOTE,
    NEW_NOTE,
    SIGNIN_USER,
    SIGNUP_USER,
    TOGGLE_FAVORITE,
}
