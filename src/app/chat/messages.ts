export class Message {
  constructor(
    public id: number,
    public chat: string,
    public sender: string,
    public recipient: string,
    public content: string,
    public date: string)
    { }
}
