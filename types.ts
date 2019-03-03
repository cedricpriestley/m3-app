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

export type Query = {
  areas: Area[];
}

type LifeSpan = {
  begin: String
  end: String
  ended: Boolean
}