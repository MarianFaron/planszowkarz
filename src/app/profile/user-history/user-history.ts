export class UserHistory {
  constructor(
     sender: string,
     recipient: string,
     selectedGames: selectedGames[],
     proposeGames: proposeGames[],
     status: string
  ) { }
}

export interface selectedGames {
    selectedGames: string
}

export interface proposeGames {
    proposeGames: string
}