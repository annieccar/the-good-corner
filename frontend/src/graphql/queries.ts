import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAds {
    AllAds {
      category {
        id
        name
      }
      createdAt
      description
      id
      location
      pictures {
        id
        url
      }
      price
      tags {
        id
        name
      }
      title
      user {
        email
        id
      }
    }
  }
`;

export const GET_ALL_ADS_BY_KEYWORD = gql`
query AllAdsByKeyword($keyword: String!) {
  AllAdsByKeyword(keyword: $keyword) {
    category {
      id
      name
    }
    createdAt
    description
    id
    location
    pictures {
      id
      url
    }
    price
    tags {
      id
      name
    }
    title
    user {
      email
      id
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
      category {
        id
        name
      }
      createdAt
      description
      id
      location
      pictures {
        id
        url
      }
      price
      tags {
        id
        name
      }
      title
      user {
        email
        id
      }
    }
  }
`;

export const GET_AD_BY_CATEGORY = gql`
query AllAdsByCategory($category: Float!) {
  AllAdsByCategory(category: $category) {
    title
    price
    pictures {
      id
      url
    }
    location
    id
    description
    category {
      id
      name
    }
    tags {
      id
      name
    }
    createdAt
  }
}
`

export const ALL_CATEGORIES_AND_USER_INFO = gql`
  query AllCategoriesAndUserInfo {
    AllCategories {
      id
      name
    }
    getUserInfo {
      email
      isLoggedIn
      userId
      userRole
    }
}
`;

export const USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      email
      isLoggedIn
      userId
      userRole
    }
  }
`;
