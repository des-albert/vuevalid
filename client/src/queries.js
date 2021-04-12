import { gql } from 'apollo-boost'

export const GET_OPTIONS = gql`
  query {
    getOptions {
      _id
      position
      label
      icon
      values
    }
  }
`
export const GET_CONFIGS = gql`
  query {
    getConfigs {
      _id
      jsonConfig
      validDate
    }
  }
`

export const ADD_CONFIG = gql`
  mutation($jsonConfig: String!, $validDate: String!) {
    addConfig(jsonConfig: $jsonConfig, validDate: $validDate) {
      jsonConfig
      validDate
    }
  }
`
export const UPDATE_CONFIG = gql`
  mutation($configId: ID!, $validDate: String!) {
    updateConfig(configId: $configId, validDate: $validDate) {
      _id
      validDate
    }
  }
`

export const DELETE_CONFIG = gql`
  mutation($configId: ID!) {
    deleteConfig(configId: $configId) {
      _id
    }
  }
`
