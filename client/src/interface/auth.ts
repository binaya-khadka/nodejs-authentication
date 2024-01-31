interface ISignup {
  name: string;
  email: string;
  passowrd: string
}

interface ILogin {
  email: string;
  password: string;
}

export type {
  ISignup,
  ILogin
}