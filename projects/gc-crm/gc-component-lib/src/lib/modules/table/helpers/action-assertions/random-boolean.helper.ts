export function getRandomBoolean(...args: any): boolean {
  return Math.random() < 0.5;
}

export function isUserRoleDifferentCustomType(...args: any): boolean {
  const [item] = args || [];
  return item?.type !== 'custom';
}
