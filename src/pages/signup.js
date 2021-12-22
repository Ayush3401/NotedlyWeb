import React, { useEffect } from 'react'
import { gql, useApolloClient, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`

const SignUp = () => {
    const client = useApolloClient()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'SignUp - Notedly'
    })

    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signUp)
            client.writeQuery({
                query: gql`
                    query {
                        user {
                            isLoggedIn
                        }
                    }
                `,
                data: {
                    user: {
                        isLoggedIn: true,
                    },
                },
            })
            navigate('/')
        },
    })

    return (
        <>
            <UserForm action={signUp} formType="signup" />
            
            {loading && <p>Loading...</p>}
            {error && <p>Error Creating Account...!</p>}
        </>
    )
}

export default SignUp
