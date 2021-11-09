class AuthorizationError extends Error {
    constructor(
                  public message: string,
                  public error?: any) 
  {
      super(message);
    }
  }
  
  export default AuthorizationError;