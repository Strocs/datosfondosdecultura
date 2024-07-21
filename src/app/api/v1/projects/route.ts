import { fetchLocal } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const offset = (page - 1) * limit;

    const projects = await fetchLocal('projects');
    const totalProjects = projects.length;
    const paginatedProjects = projects.data.slice(offset, offset + limit);

    const next = `http://localhost:3000/api/v1/projects?page=${[page + 1]}`
    const prev = `http://localhost:3000/api/v1/projects?page=${[page - 1]}`

    const resp: {
      total: number, page: number, limit: number, data: any[], next?: string, prev?: string
    } = { total: totalProjects, page, limit, data: paginatedProjects, next }

    if (page > 1) resp['prev'] = prev;

    return new Response(
      JSON.stringify(resp),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}