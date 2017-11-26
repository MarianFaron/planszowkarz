export class ContactMessage {
    constructor(
      public subject: string,
      public content: string,
      public authorEmail: string,
      public authorName: string,
      public authorSurname: string) { }
  }
  