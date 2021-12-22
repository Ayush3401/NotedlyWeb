import React, { useEffect } from 'react'
import { gql, useApolloClient, useMutation } from '@apollo/client'
import { useLocation, useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'

const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`

const SignIn = () => {
    const location = useLocation()
    useEffect(() => {
        // update the document title
        document.title = 'Sign In — Notedly'
    })
    const client = useApolloClient()
    const navigate = useNavigate()
    const [signin, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signIn)
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
            if (location.state && location.state.from)
                navigate(location.state.from.pathname)
            else navigate('/')
        },
    })
    return (
        <>
            <UserForm action={signin} formType="signin" />
            {loading && <p>Loading...</p>}
            {error && <p>Error Signing In...</p>}
        </>
    )
}
export default SignIn
