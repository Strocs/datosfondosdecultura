import { getProjects } from '@/services/api/projectService';
import { Project, APIResponse } from '@/types/projects';
import { getPaginatedData } from '@/utils/api/getPaginatedData';
import { parseQueryParams } from '@/utils/api/parseQueryParams';


export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: 'API Unavailable: Work in progress', status: 501 }), { status: 501 })

  // try {
  //   const { searchParams, origin, pathname } = new URL(request.url);

  //   const { region, line, type, sortBy, order, page, limit } = parseQueryParams(searchParams)


  //   if (region) {
  //     // TODO: paginate data if have more than 20 projects
  //     const { projects, length, region: matchedRegion } = await getProjects({ region })
  //     return new Response(JSON.stringify({ length, region: matchedRegion?.region_name, projects }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  //   }

  //   if (page < 1 || limit < 1) return new Response('Invalid query parameters', { status: 400 });


  //   const { projects, length } = await getProjects();
  //   let paginatedData = getPaginatedData<Project>(projects, page, limit)

  //   const next_url = `${origin + pathname}?page=${page + 1}&limit=${limit}`
  //   const prev_url = `${origin + pathname}?page=${page - 1}&limit=${limit}`
  //   const total_pages = Math.ceil(length / limit) | 1

  //   const resp: APIResponse<Project[]> = {
  //     data: paginatedData, pagination: {
  //       total: length, items_per_page: limit ? limit : length, current_page: page, total_pages, next_url: page < total_pages ? next_url : null, prev_url: page > 1 ? prev_url : null
  //     }
  //   }

  //   return new Response(
  //     JSON.stringify(resp),
  //     { status: 200, headers: { 'Content-Type': 'application/json' } }
  //   );

  // } catch (error) {
  //   // TODO: make a service for errors type
  //   let message
  //   if (error instanceof Error) message = error.message
  //   else message = String(error)

  //   return new Response(
  //     JSON.stringify({ error: message }),
  //     { status: 500, headers: { 'Content-Type': 'application/json' } }
  //   );
  // }
}