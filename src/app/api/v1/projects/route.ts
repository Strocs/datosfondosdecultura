import { getProjects } from '@/services/api/projectService';
import { ProjectResponse } from '@/types/projects';
import { getPaginatedData } from '@/utils/getPaginatedData';


export async function GET(request: Request) {
  try {
    const { searchParams, origin, pathname } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const region = searchParams.get('region') || '';

    if (region) {
      const { projects, length, matchedRegion } = await getProjects({ region })
      return new Response(JSON.stringify({ length, regionName: matchedRegion?.name, projects }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    if (page < 1 || limit < 1) return new Response('Invalid query parameters', { status: 400 });

    const { projects, length } = await getProjects();
    const paginatedData = getPaginatedData(projects, page, limit)

    const next = `${origin + pathname}?page=${page + 1}&limit=${limit}`
    const prev = `${origin + pathname}?page=${page - 1}&limit=${limit}`

    const resp: ProjectResponse = { length, page, limit, data: paginatedData, next }

    if (page > 1) resp['prev'] = prev;

    return new Response(
      JSON.stringify(resp),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
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