export class UserHistory {
  constructor(
     sender: string,
     recipient: string,
     senderGame: string,
     recipientGame: string,
     senderRate: boolean,
     recipientRate: boolean,
     proposeGames: proposeGames[],
     status: string
  ) { }
}

export interface proposeGames {
    proposeGames: string
}