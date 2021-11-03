import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ClassesService {
  async getAll(query = {}) {
    const classes = await dbContext.Classes.find({}).populate('creator', 'name picture')
    return classes
  }

  async getById(id) {
    const found = await dbContext.Classes.findById(id).populate('creator', 'name picture')
    if (!found) {
      throw new BadRequest('Invalid Id')
    }
    return found
  }

  async create(body) {
    const newClass = await dbContext.Classes.create(body)
    return await this.getById(newClass.id)
  }

  async edit(body) {
    const found = await this.getById(body.id)
    if (found.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You do not have permission to make that change')
    }
    const updated = await dbContext.Classes.findByIdAndUpdate(body.id, body, { new: true })
    return updated
  }

  async remove(id, userId) {
    const found = await this.getById(id)
    if (found.creatorId.toString() !== userId) {
      throw new Forbidden('You do not have permission to make that change')
    }
    await dbContext.Classes.findByIdAndDelete(id)
  }
}

export const classesService = new ClassesService()
