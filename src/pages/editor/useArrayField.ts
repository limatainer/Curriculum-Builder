export function useArrayField<T extends { id: string }>(
  items: T[],
  setItems: (items: T[]) => void
) {
  const add = (item: T) => setItems([...items, item]);
  const remove = (id: string) => setItems(items.filter((i) => i.id !== id));
  const update = <K extends keyof T>(id: string, key: K, value: T[K]) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  return { add, remove, update };
}
