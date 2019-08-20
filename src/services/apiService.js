import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';


export const getClient = async () => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
  })
    
  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000',
    options: {
      reconnect: true
    }
  })
    
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )
    
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
}

const GET_USER = gql`
  query User {
    user {
      name age
    }
  }
`;

export const getUser = async () => {
  const client = await getClient()
  userSubs(client)
  const res = await client.query({
    query: GET_USER,
  })

  if (res) return res.data.user
  
  return null
}


const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!) {
    createUser(
        name: $name
        age: $age
    ) {
      name age
    }
  }
`;


export const createUser = async (user) => {
  const client = await getClient()
  const res = await client.mutate({
    mutation: CREATE_USER,
    variables: {
      ...user
    }
  })
  if (res) return res.data.createUser
  return null
}


const USER_SUBS = gql`
  subscription UserAdded {
    userAdded {
      name age
    }
  }
`;

export const userSubs = (client) => {
  client.subscribe({
    query: USER_SUBS,
  }).subscribe({
    next(data) {
      console.log(data)
    },
    error(err) { console.error('err', err); },
  });
}


/* const GET_NUMBER = gql`
  query GetNumber($id: Int!) {
    getNumber(id: $id)
  }
`;

export const getNumber = async (num) => {
  const client = await getClient()
  const res = await client.query({
    query: GET_NUMBER,
    variables: {
      id: num
    }
  })

  if (res) return res.data
  
  return null
} */
