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
      owner
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