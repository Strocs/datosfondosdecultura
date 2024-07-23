import { DB, Project, Region } from '@/types/projects';
import fs from 'fs';
import path from 'path';


async function localFetcher<T>(fileName: string) {
  const filePath = getDBLocation(fileName);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData) as T;
}

export async function getProjects(filters: { region?: string, line?: string, type?: string }): Promise<{ projects: Project[] } | { projects: Project[], matchedRegion: Region }> {
  const projects = await localFetcher<DB<Project[]>>('projects');

  if (filters.region) {
    const { filteredProjects, matchedRegion } = await getProjectsByRegion(projects.data, filters.region)
    return { projects: filteredProjects, matchedRegion }
  }
  return { projects: projects.data }
}


async function getProjectsByRegion(projects: Project[], regionSearched: string) {
  const { data: regions } = await localFetcher<DB<Region[]>>('regions')
  const matchedRegion = regions.filter(region => {
    const values = Object.values(region)
    if (values.includes(regionSearched)) return region
  })[0]

  const filteredProjects = projects.filter(project => project.region.id === matchedRegion.id)
  return { filteredProjects, matchedRegion }

}


function getDBLocation(fileName: string): string {
  return path.join(process.cwd(), `db/${fileName}.json`);

}