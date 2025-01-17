import { gql } from "@apollo/client";


export const DELETE_AD = gql`
  mutation DeteteAd($deteteAdId: Float!) {
    deteteAd(id: $deteteAdId)
  }
`;

export const CREATE_AD = gql`
  mutation AddAd($data: AdInput!) {
    addAd(data: $data) {
      id
      title
      description
      price
      location
      createdAt
      pictures {
        id
        url
      }
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const EDIT_AD = gql`
  mutation EditAd($data: AdInputWithId!) {
  editAd(data: $data)
}
`;

export const LOGIN = gql`
  mutation Login($data: UserInput!) {
  login(data: $data)
}
`;

export const LOGOUT = gql`
 mutation Logout{
  logout
}
`;

export const CONFIRM_EMAIL = gql`
 mutation ConfirmEmail($data: UserInput!) {
  confirmEmail(data: $data)
}
`;

export const REGISTER = gql`
  mutation Register($data: Float!) {
  register(data: $data)
}
`;