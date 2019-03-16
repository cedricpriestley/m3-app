'use strict';

import gql from 'graphql-tag';

export const getAreas = gql`
  query {
  getAreas(limit: 50, offset: 0) {
    mbid
    name
    type
  }
}`;

export const getArtists = gql`
  query {
  getArtists(limit: 50, offset: 0) {
    mbid
    name
    lastFM {
      smallImage
      mediumImage
    }
  }
}`;

export const getLabels = gql`
  query {
  getLabels(limit: 50, offset: 0) {
    id
    name
    country
  }
}`;

export const getReleases = gql`
  query {
  getReleases(limit: 50, offset: 0) {
    id
    title
    coverart_url
  }
}`;

export const getReleaseGroups = gql`
  query {
  getReleaseGroups(limit: 50, offset: 0) {
    id
    title
    releases
  }
}`;

export const getArtist = gql`
query {
  lookup {
    artist(mbid: "f27ec8db-af05-4f36-916e-3d57f91ecf5e") {
      name
      gender
    }
  }
}
`;

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
