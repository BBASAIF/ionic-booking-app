export class User {
  constructor(
    public id: string,
    public email: string,
    private userToken: string,
    private tokenExpirationDate: Date
  ) {}

  get token() {
    if (
      (!this.tokenExpirationDate || this,
      this.tokenExpirationDate <= new Date())
    ) {
      return null;
    }
    return this.userToken;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    return this.tokenExpirationDate.getTime() - new Date().getTime();
    //return 5000;
  }
}
