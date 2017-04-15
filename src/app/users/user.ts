export class User {
  constructor(
    public local: {
       login: string,
       email: string,
       password: string
    }) { }
}
