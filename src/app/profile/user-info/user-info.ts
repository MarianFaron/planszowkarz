export class UserInfo {
  constructor(
    public id: number,
    public login: string,
    public email: string,
    public name: string,
    public dateBirth: string,
    public city: string,
    public contactNumber: string,
    public numberOfGames: number,
    public numberOfExchanges: number,
    public numberOfRatings: number,
    public sumOfGrades: number,
    public avatarImage: string,
    public local: {
       login: string,
       email: string,
    },
    public facebook: {
      name: string,
      email: string
    }

    ) { }
}
