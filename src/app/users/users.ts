export class User {
  constructor(
    public login: string,
    public email: string,
    public password: string,
    public confirmPassword: string,
    public avatarImage: string
    ) { }
}
