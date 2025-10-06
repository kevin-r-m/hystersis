export async function fakeApiCall(response: string, delay: number = 1000): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(response), delay);
  });
}
