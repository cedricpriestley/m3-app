'use strict';

import gql from 'graphql-tag';

export const getAreas = gql`
  query {
  getAreas(limit: 25, offset: 0) {
    id
    name
    type
  }
}`;

export const getArtists = gql`
  query {
  getArtists(limit: 25, offset: 0) {
    id
    name
    images {
      url
      size
    }
  }
}`;

export const getLabels = gql`
  query {
  getLabels(limit: 25, offset: 0) {
    id
    name
    country
  }
}`;

export const getReleases = gql`
  query {
  getReleases(limit: 25, offset: 0) {
    id
    title
    coverart_url
  }
}`;

export const getReleaseGroups = gql`
  query {
  getReleaseGroups(limit: 25, offset: 0) {
    id
    title
    releases
  }
}`;

export const getArea = gql`
  query {
  getArea(mbid: $mbid) {
    name
    type
  }
}`;

export const resetArea = gql`
  mutation resetArea($mbid: String!) {
    resetArea(mbid: $mbid) {
      mbid
      name
    }
  }`;

export const createArea = gql`
  mutation createArea($areaInput: AreaInput!) {
    createArea(areaInput: $areaInput) {
      mbid
      name
    }
  }`;
