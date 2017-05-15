export class UserInfo {
  constructor(
    public id: number,
    public local: {
       login: string,
       email: string,
    },
    public facebook: {
      name: string,
      email: string
    },
    public surName: string,
    public dateBirth: string,
    public city: string,
    public contactNumber: string
    ) { }
}
