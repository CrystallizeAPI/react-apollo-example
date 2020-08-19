import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import './index.css'
import App from './App'
import possibleTypes from './possibleTypes.json'

const client = new ApolloClient({
  uri: 'https://api.crystallize.com/teddy-bear-shop/catalogue',
  cache: new InMemoryCache({
    possibleTypes,
  }),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
