export class Exchange {
  constructor(
    public id: number,
    public recipientGame: string,
    public sender: string,
    public recipient: string,
    public proposeGames: string[],
    public status: string,
    public date: string,
    public senderGame: string)
    { }
}