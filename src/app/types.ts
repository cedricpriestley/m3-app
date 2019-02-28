export type Area = {
  mbid: string;
  name: string;
  lastUpdated: string;
  type: string;
}
export type Query = {
  areas: Area[];
}