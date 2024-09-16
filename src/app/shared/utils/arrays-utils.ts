export function getMaxIdByKey<T extends Record<string, any>>(array: T[], key: keyof T = 'id'): number {
  return array.length ? Math.max(...array.map(item => item[key] as number)) + 1 : 1;
}

export function removeById<T extends { id?: number }>(array: T[], id: number): T[] {
  return array?.filter(item => item.id !== id) ?? [];
}
