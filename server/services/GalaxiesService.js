import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

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

  async edit(update) {
    const galaxy = await this.getById(update.id)
    if (galaxy.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('access denied')
    }
    const updated = await dbContext.Galaxies.findByIdAndUpdate(update.id, update, { new: true })
    return updated
  }

  async remove(galaxyId, userId) {
    const galaxy = await this.getById(galaxyId)
    if (galaxy.creatorId.toString() !== userId) {
      throw new Forbidden('access denied')
    }
    await dbContext.Galaxies.findByIdAndDelete(galaxyId)
  }
}

export const galaxiesService = new GalaxiesService()
