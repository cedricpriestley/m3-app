export type Area = {
  mbid: string;
  name: string;
  lastUpdated: string;
  type: string;
}
export type Query = {
  areas: Area[];
}

type LifeSpan {
  begin: String
  end: String
  ended: Boolean
}

type Area {
  _id: ID!
  mbid: String!
  name: String!
  disambiguation: String
  type: String!
  typeId: String!
  sortName: String!
  aliases: [String!]
  lifeSpan: LifeSpan
  slug: String!
  lastUpdated: String!
}