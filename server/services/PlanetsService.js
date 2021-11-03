import { dbContext } from '../db/DbContext'

class PlanetsService {
  async getAll(query = {}) {
    const planets = await dbContext.Planets.find(query)
      .populate('creator', 'name picture')
      .populate('galaxy')
    return planets
  }

  async create(newPlanet) {
    const planet = await dbContext.Planets.create(newPlanet)
    return planet
  }
}
export const planetsService = new PlanetsService()
