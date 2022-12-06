function sum(...numbs: number[]): number {
  const result = numbs.reduce((pre, current) => {
    return pre + current;
  });
  return result;
}

export { sum };
