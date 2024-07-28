import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const BASE_PATH = path.resolve('db/json')

async function main () {
  try {
    const { funds, lines, projects } = await filterNewData()

    if (!funds && !lines && !projects) return console.log('No new data to seed')

    // await updateRegions()

    Promise.all([
      funds && prisma.funds.createMany({ data: funds }),
      lines && prisma.lines.createMany({ data: lines }),
      projects && prisma.projects.createMany({ data: projects })
    ])

    console.log(
      `Seed completed successfully: 
        ${funds ? 'Funds' : ''} 
        ${lines ? 'Lines' : ''} 
        ${projects ? 'Projects' : ''}`
    )
  } catch {
    throw new Error('Seed failed')
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

export function getDataFromJson () {
  const { data: regions } = JSON.parse(
    fs.readFileSync(`${BASE_PATH}/regions.json`, 'utf-8')
  )
  const { data: funds } = JSON.parse(
    fs.readFileSync(`${BASE_PATH}/funds.json`, 'utf-8')
  )
  const { data: lines } = JSON.parse(
    fs.readFileSync(`${BASE_PATH}/lines.json`, 'utf-8')
  )
  const { data: projects } = JSON.parse(
    fs.readFileSync(`${BASE_PATH}/projects.json`, 'utf-8')
  )

  return { regions, funds, lines, projects }
}

export async function filterNewData () {
  const { funds, lines, projects } = getDataFromJson()

  const dbProjects = await prisma.projects.findMany()
  const dbLines = await prisma.lines.findMany()
  const dbFunds = await prisma.funds.findMany()

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
    funds: fundsFiltered
  }
}

export async function updateRegions () {
  const { regions } = filterNewData()
  const regionsFiltered = regions.map(
    ({ region_id, region_name, region_abbr }) => ({
      region_id,
      region_name,
      region_abbr
    })
  )
  await prisma.regions.createMany({
    data: regionsFiltered
  })
}
