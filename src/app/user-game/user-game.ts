export class UserGame {
  constructor(
    public id: number,
    public title: string,
    public category: string,
    public state: string,
    public description: string,
    public userID: string,
    public gameImage: string) { }
}
