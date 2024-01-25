export class CreateGymError extends Error {
  constructor() {
    super('Unable to create gym.');
  }
}