import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL || 'file:db/local.db'
const authToken = process.env.TURSO_AUTH_TOKEN || ''

export const turso = createClient({
  url,
  authToken,
})

export const getByQuery = async (query: string) => {
  const result = await turso.execute(query)
  return {
    ...result,
    rows: result.rows.map((row) =>
      Object.fromEntries(result.columns.map((col, i) => [col, row[i]])),
    ),
  }
}
