import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  pictures: Array<Picture>;
  price: Scalars['Float']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type AdInput = {
  category: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  pictures?: InputMaybe<Array<Scalars['String']['input']>>;
  price: Scalars['Float']['input'];
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
  title: Scalars['String']['input'];
};

export type AdInputWithId = {
  category?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pictures?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAd: Ad;
  deteteAd: Scalars['String']['output'];
  editAd: Scalars['String']['output'];
};


export type MutationAddAdArgs = {
  data: AdInput;
};


export type MutationDeteteAdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEditAdArgs = {
  data: AdInputWithId;
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  AllAds: Array<Ad>;
  AllAdsByCategory: Array<Ad>;
  AllAdsByKeyword: Array<Ad>;
  AllCategories: Array<Category>;
  AllTags: Array<Tag>;
  getAdById: Ad;
};


export type QueryAllAdsByCategoryArgs = {
  category: Scalars['Float']['input'];
};


export type QueryAllAdsByKeywordArgs = {
  keyword: Scalars['String']['input'];
};


export type QueryGetAdByIdArgs = {
  id: Scalars['Float']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type DeteteAdMutationVariables = Exact<{
  deteteAdId: Scalars['Float']['input'];
}>;


export type DeteteAdMutation = { __typename?: 'Mutation', deteteAd: string };

export type AddAdMutationVariables = Exact<{
  data: AdInput;
}>;


export type AddAdMutation = { __typename?: 'Mutation', addAd: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type EditAdMutationVariables = Exact<{
  data: AdInputWithId;
}>;


export type EditAdMutation = { __typename?: 'Mutation', editAd: string };

export type GetAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdsQuery = { __typename?: 'Query', AllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null }> };

export type AllAdsByKeywordQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
}>;


export type AllAdsByKeywordQuery = { __typename?: 'Query', AllAdsByKeyword: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null }> };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', AllCategories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type AllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTagsQuery = { __typename?: 'Query', AllTags: Array<{ __typename?: 'Tag', id: number, name: string }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['Float']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null } };

export type AllAdsByCategoryQueryVariables = Exact<{
  category: Scalars['Float']['input'];
}>;


export type AllAdsByCategoryQuery = { __typename?: 'Query', AllAdsByCategory: Array<{ __typename?: 'Ad', title: string, price: number, owner: string, location: string, id: number, description: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, name: string } | null, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null }> };


export const DeteteAdDocument = gql`
    mutation DeteteAd($deteteAdId: Float!) {
  deteteAd(id: $deteteAdId)
}
    `;
export type DeteteAdMutationFn = Apollo.MutationFunction<DeteteAdMutation, DeteteAdMutationVariables>;

/**
 * __useDeteteAdMutation__
 *
 * To run a mutation, you first call `useDeteteAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeteteAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deteteAdMutation, { data, loading, error }] = useDeteteAdMutation({
 *   variables: {
 *      deteteAdId: // value for 'deteteAdId'
 *   },
 * });
 */
export function useDeteteAdMutation(baseOptions?: Apollo.MutationHookOptions<DeteteAdMutation, DeteteAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeteteAdMutation, DeteteAdMutationVariables>(DeteteAdDocument, options);
      }
export type DeteteAdMutationHookResult = ReturnType<typeof useDeteteAdMutation>;
export type DeteteAdMutationResult = Apollo.MutationResult<DeteteAdMutation>;
export type DeteteAdMutationOptions = Apollo.BaseMutationOptions<DeteteAdMutation, DeteteAdMutationVariables>;
export const AddAdDocument = gql`
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
export type AddAdMutationFn = Apollo.MutationFunction<AddAdMutation, AddAdMutationVariables>;

/**
 * __useAddAdMutation__
 *
 * To run a mutation, you first call `useAddAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdMutation, { data, loading, error }] = useAddAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddAdMutation(baseOptions?: Apollo.MutationHookOptions<AddAdMutation, AddAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAdMutation, AddAdMutationVariables>(AddAdDocument, options);
      }
export type AddAdMutationHookResult = ReturnType<typeof useAddAdMutation>;
export type AddAdMutationResult = Apollo.MutationResult<AddAdMutation>;
export type AddAdMutationOptions = Apollo.BaseMutationOptions<AddAdMutation, AddAdMutationVariables>;
export const EditAdDocument = gql`
    mutation EditAd($data: AdInputWithId!) {
  editAd(data: $data)
}
    `;
export type EditAdMutationFn = Apollo.MutationFunction<EditAdMutation, EditAdMutationVariables>;

/**
 * __useEditAdMutation__
 *
 * To run a mutation, you first call `useEditAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAdMutation, { data, loading, error }] = useEditAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditAdMutation(baseOptions?: Apollo.MutationHookOptions<EditAdMutation, EditAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAdMutation, EditAdMutationVariables>(EditAdDocument, options);
      }
export type EditAdMutationHookResult = ReturnType<typeof useEditAdMutation>;
export type EditAdMutationResult = Apollo.MutationResult<EditAdMutation>;
export type EditAdMutationOptions = Apollo.BaseMutationOptions<EditAdMutation, EditAdMutationVariables>;
export const GetAdsDocument = gql`
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

/**
 * __useGetAdsQuery__
 *
 * To run a query within a React component, call `useGetAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdsQuery, GetAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsQuery, GetAdsQueryVariables>(GetAdsDocument, options);
      }
export function useGetAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsQuery, GetAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsQuery, GetAdsQueryVariables>(GetAdsDocument, options);
        }
export function useGetAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsQuery, GetAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsQuery, GetAdsQueryVariables>(GetAdsDocument, options);
        }
export type GetAdsQueryHookResult = ReturnType<typeof useGetAdsQuery>;
export type GetAdsLazyQueryHookResult = ReturnType<typeof useGetAdsLazyQuery>;
export type GetAdsSuspenseQueryHookResult = ReturnType<typeof useGetAdsSuspenseQuery>;
export type GetAdsQueryResult = Apollo.QueryResult<GetAdsQuery, GetAdsQueryVariables>;
export const AllAdsByKeywordDocument = gql`
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

/**
 * __useAllAdsByKeywordQuery__
 *
 * To run a query within a React component, call `useAllAdsByKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAdsByKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAdsByKeywordQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useAllAdsByKeywordQuery(baseOptions: Apollo.QueryHookOptions<AllAdsByKeywordQuery, AllAdsByKeywordQueryVariables> & ({ variables: AllAdsByKeywordQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAdsByKeywordQuery, AllAdsByKeywordQueryVariables>(AllAdsByKeywordDocument, options);
      }
export function useAllAdsByKeywordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAdsByKeywordQuery, AllAdsByKeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAdsByKeywordQuery, AllAdsByKeywordQueryVariables>(AllAdsByKeywordDocument, options);
        }
export function useAllAdsByKeywordSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllAdsByKeywordQuery, AllAdsByKeywordQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllAdsByKeywordQuery, AllAdsByKeywordQueryVariables>(AllAdsByKeywordDocument, options);
        }
export type AllAdsByKeywordQueryHookResult = ReturnType<typeof useAllAdsByKeywordQuery>;
export type AllAdsByKeywordLazyQueryHookResult = ReturnType<typeof useAllAdsByKeywordLazyQuery>;
export type AllAdsByKeywordSuspenseQueryHookResult = ReturnType<typeof useAllAdsByKeywordSuspenseQuery>;
export type AllAdsByKeywordQueryResult = Apollo.QueryResult<AllAdsByKeywordQuery, AllAdsByKeywordQueryVariables>;
export const AllCategoriesDocument = gql`
    query AllCategories {
  AllCategories {
    id
    name
  }
}
    `;

/**
 * __useAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
      }
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export function useAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesSuspenseQueryHookResult = ReturnType<typeof useAllCategoriesSuspenseQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const AllTagsDocument = gql`
    query AllTags {
  AllTags {
    id
    name
  }
}
    `;

/**
 * __useAllTagsQuery__
 *
 * To run a query within a React component, call `useAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTagsQuery(baseOptions?: Apollo.QueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, options);
      }
export function useAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, options);
        }
export function useAllTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, options);
        }
export type AllTagsQueryHookResult = ReturnType<typeof useAllTagsQuery>;
export type AllTagsLazyQueryHookResult = ReturnType<typeof useAllTagsLazyQuery>;
export type AllTagsSuspenseQueryHookResult = ReturnType<typeof useAllTagsSuspenseQuery>;
export type AllTagsQueryResult = Apollo.QueryResult<AllTagsQuery, AllTagsQueryVariables>;
export const GetAdByIdDocument = gql`
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

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      getAdByIdId: // value for 'getAdByIdId'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const AllAdsByCategoryDocument = gql`
    query AllAdsByCategory($category: Float!) {
  AllAdsByCategory(category: $category) {
    title
    price
    pictures {
      id
      url
    }
    owner
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
    `;

/**
 * __useAllAdsByCategoryQuery__
 *
 * To run a query within a React component, call `useAllAdsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAdsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAdsByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useAllAdsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<AllAdsByCategoryQuery, AllAdsByCategoryQueryVariables> & ({ variables: AllAdsByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAdsByCategoryQuery, AllAdsByCategoryQueryVariables>(AllAdsByCategoryDocument, options);
      }
export function useAllAdsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAdsByCategoryQuery, AllAdsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAdsByCategoryQuery, AllAdsByCategoryQueryVariables>(AllAdsByCategoryDocument, options);
        }
export function useAllAdsByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllAdsByCategoryQuery, AllAdsByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllAdsByCategoryQuery, AllAdsByCategoryQueryVariables>(AllAdsByCategoryDocument, options);
        }
export type AllAdsByCategoryQueryHookResult = ReturnType<typeof useAllAdsByCategoryQuery>;
export type AllAdsByCategoryLazyQueryHookResult = ReturnType<typeof useAllAdsByCategoryLazyQuery>;
export type AllAdsByCategorySuspenseQueryHookResult = ReturnType<typeof useAllAdsByCategorySuspenseQuery>;
export type AllAdsByCategoryQueryResult = Apollo.QueryResult<AllAdsByCategoryQuery, AllAdsByCategoryQueryVariables>;