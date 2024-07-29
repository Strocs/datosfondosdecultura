import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

//! Since syncUrl seems to be broke, I need to manually change the env url to work in remote or local
export const client = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  // syncUrl: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})


const adapter = new PrismaLibSQL(client)
export const prismaRemote = new PrismaClient({ adapter })
export const prismaLocal = new PrismaClient()
