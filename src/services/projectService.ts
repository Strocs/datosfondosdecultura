import prisma from '@/lib/prisma';

const selector = {
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

export const getProjects = async (filters?: { region?: string, line?: string, type?: string }) => {
  const projects = await prisma.projects.findMany({
    select: selector
  })

  const projectsLength = await prisma.projects.count()

  if (filters?.region) {
    const { projects, region_abbr, region_id, region_name } = await findRegion(filters.region)
    return {
      projects,
      region: { region_id, region_name, region_abbr },
      length: projects.length
    }
  }

  return { projects, length: projectsLength }
}


async function findRegion(regionSearched: string) {
  const region = await prisma.regions.findFirstOrThrow({
    where: {
      OR: [
        { region_id: { contains: regionSearched } },
        { region_name: { contains: regionSearched } },
        { region_abbr: { contains: regionSearched } }
      ]
    },
    select: {
      region_id: true,
      region_name: true,
      region_abbr: true,
      projects: { select: selector },
    }
  })
  return region
}
