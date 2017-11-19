export class ContactMessage {
    constructor(
      public id: number,
      public subject: string,
      public content: string,
      public authorEmail: string,
      public authorName: string,
      public authorSurname: string) { }
  }
  