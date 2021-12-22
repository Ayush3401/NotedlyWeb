import React, { useEffect } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { IS_LOGGED_IN } from '../gql/query'
import { SIGNUP_USER } from '../gql/mutation'

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
                query: IS_LOGGED_IN,
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
