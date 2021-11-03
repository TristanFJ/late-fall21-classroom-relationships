import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class StarsService {
  async getAll(query = {}) {
    const stars = await dbContext.Stars.find(query)
      .populate('creator', 'name picture')
      .populate('galaxy')
    return stars
  }

  async getById(id) {
    const star = await dbContext.Stars.findById(id)
      .populate('creator', 'name picture')
      .populate('galaxy')
    if (!star) {
      throw new BadRequest('invalid id')
    }
    return star
  }

  async create(newStar) {
    const star = await dbContext.Stars.create(newStar)
    return star
  }

  async edit(update) {
    const star = await this.getById(update.id)
    if (star.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('access denied')
    }
    const updated = await dbContext.Stars.findByIdAndUpdate(update.id, update, { new: true })
    return updated
  }
}

export const starsService = new StarsService()
