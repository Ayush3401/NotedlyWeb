import React from 'react'
import styled from 'styled-components'
import { useApolloClient, useQuery } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../img/logo.svg'
import ButtonAsLink from './ButtonAsLink'
import { IS_LOGGED_IN } from '../gql/query'

const UserState = styled.div`
    margin-left: auto;
`
const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;
`

const LogoText = styled.h1`
    margin: 0;
    padding: 0;
    display: inline;
`

const Header = () => {
    const client = useApolloClient()
    const navigate = useNavigate()
    const { data } = useQuery(IS_LOGGED_IN)

    const handleLogout = () => {
        localStorage.removeItem('token')
        client.writeQuery({
            query: IS_LOGGED_IN,
            data: {
                user: {
                    isLoggedIn: false,
                },
            },
        })
        navigate('/')
    }

    return (
        <HeaderBar>
            <LogoText>
                <img src={logo} alt="Notedly Logo" height="40" />
                Notedly
            </LogoText>
            <UserState>
                {data.user.isLoggedIn ? (
                    <ButtonAsLink onClick={handleLogout}>Log Out</ButtonAsLink>
                ) : (
                    <p>
                        <Link to="/signin">Sign In</Link> or{' '}
                        <Link to="/signup">Sign Up</Link>
                    </p>
                )}
            </UserState>
        </HeaderBar>
    )
}
export default Header
