export class UserInfo {
  constructor(
    public id: number,
    public login: string,
    public email: string,
    public name: string,
    public dateBirth: string,
    public city: string,
    public contactNumber: string,
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
