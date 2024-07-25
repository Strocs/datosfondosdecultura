export function getPaginatedData<T>(data: T[], page: number, limit: number) {
  if (!limit) return data

  const offset = (page - 1) * limit;
  const paginatedData = data.slice(offset, offset + limit);

  return paginatedData;
}