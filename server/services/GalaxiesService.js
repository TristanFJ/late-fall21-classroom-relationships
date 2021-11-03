import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GalaxiesService {
  async getAll(query = {}) {
    const galaxies = await dbContext.Galaxies.find({}).populate('creator', 'name picture')
    return galaxies
  }

  async getById(id) {
    const found = await dbContext.Galaxies.findById(id).populate('creator', 'name picture')
    if (!found) {
      throw new BadRequest('invalid id')
    }
    return found
  }

  async create(body) {
    const newGalaxy = await dbContext.Galaxies.create(body)
    return await this.getById(newGalaxy.id)
  }
}

export const galaxiesService = new GalaxiesService()
