export class Exchange {
  constructor(
    public id: number,
    public sender: string[],
    public recipient: string[],
    public status: string,
    public selectedGames: string,
    public proposeGames: string){ }
}