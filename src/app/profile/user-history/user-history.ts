export class UserHistory {
  constructor(
     sender: string,
     recipient: string,
     senderGame: string,
     recipientGame: string,
     proposeGames: proposeGames[],
     status: string
  ) { }
}

export interface proposeGames {
    proposeGames: string
}