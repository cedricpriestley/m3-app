'use strict';

import gql from 'graphql-tag';

export const getAreas = gql`
  query {
  getAreas(limit: 2, offset: 0) {
    name
    type
  }
}`;

export const resetArea = gql`
  mutation removeUser($id: String!) {
    resetArea(id: $id) {
      id
      name
    }
  }`;