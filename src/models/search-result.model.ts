export class SearchResult {
  id: string;
  name: string;
  title: string;
  disambiguation: string;
  type: string;
  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.disambiguation = obj && obj.disambiguation || null;
    this.type = obj && obj.type || null;
  }
}