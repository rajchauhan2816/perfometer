export class UsernameNotFoundError extends Error {
  constructor() {
    super(`Username not found`);
  }
}
