export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Not possible make check in twice in same day');
  }
}
