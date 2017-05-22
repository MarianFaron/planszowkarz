export class UserNotification {
  constructor(
    public id: number,
    public content: string,
    public sendDate: Date,
    public userID: string,
    public status: string) { }
}
