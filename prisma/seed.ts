import { JSONDatabase, Region } from '@/types/projects'
import { Funds, Lines, PrismaClient, Projects } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const BASE_PATH = path.resolve('db/json')

async function main() {
  try {
    const { funds, lines, projects, regions } = await getDataToUpdate()

    if (!funds && !lines && !projects && !regions) {
      console.log('No new data to seed')
      return
    }

    if (regions) await prisma.regions.createMany({ data: regions })
    if (funds) await prisma.funds.createMany({ data: funds })
    if (lines) await prisma.lines.createMany({ data: lines })
    if (projects) await prisma.projects.createMany({ data: projects })

    console.log(
      `Seed completed successfully: 
        ${regions ? 'Regions' : ''}
        ${funds ? 'Funds' : ''} 
        ${lines ? 'Lines' : ''} 
        ${projects ? 'Projects' : ''}`
    )

  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    console.log(message)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

function getDataFromJson() {
  const { data: regions }: JSONDatabase<Region[]> = JSON.parse(
    fs.readFileSync(`${BASE_PATH}/regions.json`, 'utf-8')
  )
  const { data: funds }: JSONDatabase<Funds[]> = JSON.parse(
    fs.readFileSync(`${BASE_PATH}/funds.json`, 'utf-8')
  )
  const { data: lines }: JSONDatabase<Lines[]> = JSON.parse(
    fs.readFileSync(`${BASE_PATH}/lines.json`, 'utf-8')
  )
  const { data: projects }: JSONDatabase<Projects[]> = JSON.parse(
    fs.readFileSync(`${BASE_PATH}/projects.json`, 'utf-8')
  )

  return { regions, funds, lines, projects }
}

async function getDataToUpdate() {
  const { funds, lines, projects, regions } = getDataFromJson()

  const dbRegions = await prisma.regions.findMany()
  const dbLines = await prisma.lines.findMany()
  const dbFunds = await prisma.funds.findMany()
  const dbProjects = await prisma.projects.findMany()

  const regionsFiltered = formatRegionsWithDBSchema(regions).filter(
    project =>
      !dbRegions.some(dbRegion => dbRegion.region_id === project.region_id)
  )
  const projectsFiltered = projects.filter(
    project =>
      !dbProjects.some(dbProject => dbProject.project_id === project.project_id)
  )
  const linesFiltered = lines.filter(
    line => !dbLines.some(dbLine => dbLine.line_id === line.line_id)
  )
  const fundsFiltered = funds.filter(
    fund => !dbFunds.some(dbFund => dbFund.fund_id === fund.fund_id)
  )

  return {
    projects: projectsFiltered,
    lines: linesFiltered,
    funds: fundsFiltered,
    regions: regionsFiltered
  }
}

function formatRegionsWithDBSchema(regionData: Region[]) {
  return regionData.map(({ region_id, region_name, region_abbr }) => ({
    region_id,
    region_name,
    region_abbr
  }))
}