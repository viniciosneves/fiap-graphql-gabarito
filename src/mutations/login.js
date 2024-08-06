import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation AddUser($credentials: LoginUserDto!) {
  login(input: $credentials) {
    accessToken
  }
}
`