import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const getClient = async () => {
  return new ApolloClient({
    uri: 'http://localhost:3003/',
  });
}

const GET_USER = gql`
  {
    user {
      name age
    }
  }
`;

export const getUser = async () => {
  const client = await getClient()
  const res = await client.query({
    query: GET_USER,
  })

  if (res) return res.data.user
  
  return null
}


const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!) {
    createUser(
      data: {
        name: $name
        age: $age
      }
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
