import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//add mutation to ADD_BOOKMARK using mutation addTutorialtoUser

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($id: ID!, $username: String, $email: String) {
    updateUserProfile(_id: $id, username: $username, email: $email) {
      _id
      email
      username
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token) {
      token
      user {
        _id
        username
      }
    }
  }
`;



