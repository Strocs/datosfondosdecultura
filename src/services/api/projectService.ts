import { DB, Project, Region } from '@/types/projects';
import fs from 'fs';
import path from 'path';

type GetProjects = (filters?: { region?: string, line?: string, type?: string }) => Promise<{
  projects: Project[],
  length: number
  matchedRegion?: Region
}>

async function localFetcher<T>(fileName: string) {
  const filePath = getDBLocation(fileName);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData) as T;
}

export const getProjects: GetProjects = async (filters) => {
  const projects = await localFetcher<DB<Project[]>>('projects');

  if (filters?.region) {
    const { filteredProjects, matchedRegion } = await findRegion(projects.data, filters.region)
    return { projects: filteredProjects, matchedRegion, length: filteredProjects.length }
  }
  return { projects: projects.data, length: projects.length }
}


async function findRegion(projects: Project[], regionSearched: string) {
  const { data: regions } = await localFetcher<DB<Region[]>>('regions')
  const matchedRegion = regions.filter(region => {
    const values = Object.values(region)
    for (const value of values) {
      if (value.toLowerCase().includes(regionSearched.toLowerCase())) return region
    }
  })[0]

  const filteredProjects = projects.filter(project => project.region.id === matchedRegion.id)
  return { filteredProjects, matchedRegion }

}


function getDBLocation(fileName: string): string {
  return path.join(process.cwd(), `db/${fileName}.json`);

}