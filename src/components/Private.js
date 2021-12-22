import { useApolloClient } from '@apollo/client'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { IS_LOGGED_IN } from '../gql/query'

const Private = ({ component }) => {
    const location = useLocation()
    const client = useApolloClient()
    const { user } = client.readQuery({ query: IS_LOGGED_IN })
    // return (<Route {...rest} { user.isLoggedIn ? element = {element} : element = {<Navigate replace to="/signin"/>}} />)
    if (user.isLoggedIn) return component
    return <Navigate to="/signin" state={{ from: location }} />
}

Private.propTypes = {
    component: PropTypes.element.isRequired,
}

export default Private
