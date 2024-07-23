import { fetchLocal } from '@/lib/db';
import { DB, Project, Region } from '@/types/projects';

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const searchedRegion = searchParams.get('region')

  const { data: regions }: DB<Region[]> = await fetchLocal('regions')
  const { data: projects }: DB<Project[]> = await fetchLocal('projects')

  if (!searchedRegion) return new Response(JSON.stringify({
    total: projects.length,
    data: projects
  }), { status: 200 });

  const matchedRegion = regions.filter(region => {
    const values = Object.values(region)
    if (values.includes(searchedRegion)) return region
  })[0]

  if (!matchedRegion) return new Response('Region not found', { status: 404 })

  const filteredProjects = projects.filter(project => project.region.id === matchedRegion.id)

  return new Response(JSON.stringify({
    total: filteredProjects.length,
    totalAmount: filteredProjects.reduce((acc, project) => acc + project.amountAssigned, 0),
    data: filteredProjects,
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}