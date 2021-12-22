import React from 'react'
import ReactDOM from 'react-dom'
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    gql,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Pages from './pages'
import GlobalStyle from './components/GlobalStyle'

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
    query: gql`
        query {
            user {
                isLoggedIn
            }
        }
    `,
    data: {
        user: {
            isLoggedIn: !!localStorage.getItem('token'),
        },
    },
})

client.onResetStore(() => {
    client.writeQuery({
        query: gql`
            query {
                user {
                    isLoggedIn
                }
            }
        `,
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
