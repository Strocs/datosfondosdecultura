export function getPaginatedData<T>(data: T[], page: number, limit: number) {
  const offset = (page - 1) * limit;
  const paginatedData = data.slice(offset, offset + limit);
  const totalData = data.length;

  return { paginatedData, totalData };
}