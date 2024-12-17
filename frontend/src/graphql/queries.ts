import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAds {
    AllAds {
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

export const GET_ALL_ADS_BY_KEYWORD = gql`
query AllAdsByKeyword($keyword: String!) {
  AllAdsByKeyword(keyword: $keyword) {
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

export const GET_ALL_CATEGORIES = gql`
  query AllCategories {
    AllCategories {
      id
      name
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query AllTags {
  AllTags {
    id
    name
  }
}
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
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
