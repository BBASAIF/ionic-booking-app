export class User {
  constructor(
    public id: string,
    public email: string,
    private userToken: string,
    private tokenExpirationDate: Date
  ) {}

  get token(){
    if(!this.tokenExpirationDate || this,this.tokenExpirationDate <= new Date()){
      return null;
    }
    return this.userToken;
  }
}
