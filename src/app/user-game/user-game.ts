export class UserGame {
  constructor(
    public id: number,
    public title: string,
    public category: string,
    public state: string,
    public description: string,
    public createdDate: Date,
    public modifiedDate: Date,
    public userID: string,
    public gameImage: string) { }
}
