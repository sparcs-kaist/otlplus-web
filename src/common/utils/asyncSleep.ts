export function asyncSleep(ms: number) {
  return new Promise<null>((res, _) => {
    setTimeout(() => res(null), ms);
  });
}
