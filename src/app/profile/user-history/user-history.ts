export class UserHistory {
  constructor(
  	 status: string,
     users: Users[],
     games: Games[]
  ) { }
}

export interface Users {
    user: string
}

export interface Games {
    game: string
}