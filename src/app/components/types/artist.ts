export type Artist = {
  mbid: string;
  name: string;
  sortName: string;
  disambiguation: string;
  country: string;
  type: string;
  typeID: string;
  rating: {
    voteCount: number
    value: string;
  }
}

export type Query = {
  artist: Artist;
}

export type Mutation = {
  saveArtist: Artist;
}
