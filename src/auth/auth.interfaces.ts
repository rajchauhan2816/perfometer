export type AuthenticatedUser = {
  username: string;
  userId: number;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
