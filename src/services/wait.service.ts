export const Wait = new (class WaitService {
  async forSeconds(seconds: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
  }
})();
