import React from 'react'
import ReactDOM from 'react-dom'
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Pages from './pages'
import GlobalStyle from './components/GlobalStyle'
import { IS_LOGGED_IN } from './gql/query'

const uri = process.env.API_URI
const httpLink = createHttpLink({
    uri,
})
const cache = new InMemoryCache({
    typePolicies: {
        Note: {
            keyFields: ['id'],
        },
        User: {
            keyFields: ['id'],
        },
        NoteFeed: {
            keyFields: ['cursor'],
        },
    },
})
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token || '',
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true,
})

client.writeQuery({
    query: IS_LOGGED_IN,
    data: {
        user: {
            isLoggedIn: !!localStorage.getItem('token'),
        },
    },
})

client.onResetStore(() => {
    client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
            user: { isLoggedIn: !!localStorage.getItem('token') },
        },
    })
})

const App = () => (
    <ApolloProvider client={client}>
        <GlobalStyle />
        <Pages />
    </ApolloProvider>
)
ReactDOM.render(<App />, document.getElementById('root'))
