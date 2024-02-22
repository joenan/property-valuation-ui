export interface UserToken {
  exp: number;
  iat: number;
  sub: string;
}

export const defaults: UserToken = {
  exp: 0,
  iat: 0,
  sub: "",
};
