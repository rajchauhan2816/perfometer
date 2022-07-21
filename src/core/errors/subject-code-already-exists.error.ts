export class SubjectCodeAlreadyExistsError extends Error {
  constructor() {
    super(`Subject code already exists`);
  }
}