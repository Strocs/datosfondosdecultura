import { fetchLocal } from '@/lib/db';

interface Projects {
  "id": number,
  "region": {
    "id": string,
    "short_name": string,
    "name": string
  },
  "year": number,
  "folio": number,
  "line": {
    "id": string,
    "name": string,
    "modality": string
  },
  "projectName": string,
  "projectOwner": string,
  "amountAssigned": number,
  "status": string,
  "type": {
    "id": string,
    "name": string
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const offset = (page - 1) * limit;

    const projects = await fetchLocal('projects');
    const totalProjects = projects.length;
    const paginatedProjects = projects.data.slice(offset, offset + limit);

    const baseUrl = request.url.split('?')[0];
    const next = `${baseUrl}?page=${page + 1}&limit=${limit}`
    const prev = `${baseUrl}?page=${page - 1}&limit=${limit}`

    const resp: {
      total: number, page: number, limit: number, data: Projects, next?: string, prev?: string
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