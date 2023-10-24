export function omitUndefinedValues<T>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj as any).filter(([_, value]) => value !== undefined),
  ) as T
}
