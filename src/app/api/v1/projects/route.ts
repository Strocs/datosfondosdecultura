import { getProjects } from '@/services/projectService';
import { Project, APIResponse } from '@/types/projects';
import { getPaginatedData } from '@/utils/api/getPaginatedData';
import { parseQueryParams } from '@/utils/api/parseQueryParams';
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'



let cachedClient: PrismaClient<{ adapter: PrismaLibSQL }> | null = null

export async function GET(request: Request) {
  if (!cachedClient) {
    const client = createClient({
      url: `${process.env.TURSO_DATABASE_URL}`,
      authToken: `${process.env.TURSO_AUTH_TOKEN}`,
    })
    const adapter = new PrismaLibSQL(client)
    cachedClient = new PrismaClient({ adapter })
  }

  const prisma = cachedClient

  try {
    const { searchParams, origin, pathname } = new URL(request.url);

    const { region, line, type, sortBy, order, page, limit } = parseQueryParams(searchParams)


    // if (region) {
    //   // TODO: paginate data if have more than 20 projects
    //   const { projects, length, region: matchedRegion } = await getProjects({ region })
    //   return new Response(JSON.stringify({ length, region: matchedRegion?.region_name, projects }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    // }

    // if (page < 1 || limit < 1) return new Response('Invalid query parameters', { status: 400 });


    // const { projects, length } = await getProjects();


    const projects = await prisma.projects.findMany({
      select: {
        project_id: true,
        project_name: true,
        project_owner: true,
        region: {
          select: {
            region_name: true
          }
        },
        fund: {
          select: {
            fund_name: true
          }
        },
        project_year: true,
        line: {
          select: {
            line_name: true
          }
        },
        modality: true,
        status: true,
        amount_assigned: true,
      }
    })

    let paginatedData = getPaginatedData<Project>(projects, page, limit)

    const length = projects.length

    const next_url = `${origin + pathname}?page=${page + 1}&limit=${limit}`
    const prev_url = `${origin + pathname}?page=${page - 1}&limit=${limit}`
    const total_pages = Math.ceil(length / limit) | 1

    const resp: APIResponse<Project[]> = {
      data: paginatedData, pagination: {
        total: length, items_per_page: limit ? limit : length, current_page: page, total_pages, next_url: page < total_pages ? next_url : null, prev_url: page > 1 ? prev_url : null
      }
    }

    return new Response(
      JSON.stringify(resp),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=31536000, immutable', } }
    );

  } catch (error) {
    // TODO: make a service for errors type
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)

    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}