import { gql } from "@apollo/client";

export const ADD_TRANSACTION = gql`
mutation AddTransaction($input: CreateTransactionDto!) {
	addTransaction(input: $input) {
    _id
    type
    value
    createdAt
  }
}
`