import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class StudentsService {
  async getAll(query = {}) {
    const students = await dbContext.Students.find(query).populate('creator', 'name picture')
    return students
  }

  async getById(id) {
    const student = await dbContext.Students.findById(id).populate('creator', 'name picture')
    if (!student) {
      throw new BadRequest('Invalid Id')
    }
    return student
  }

  async create(newStudent) {
    const student = await dbContext.Students.create(newStudent)
    return student
  }

  async edit(update) {
    // go get the student and the getById method will handle the check if its a valid id
    const student = await this.getById(update.id)
    if (student.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('you do not have permission to make that change')
    }
    const updated = await dbContext.Students.findByIdAndUpdate(update.id, update, { new: true })
    return updated
  }

  async remove(studentId, userId) {
    const student = await this.getById(studentId)
    if (student.creatorId.toString() !== userId) {
      throw new Forbidden('you do not have permission to make that change')
    }
    await dbContext.Students.findByIdAndDelete(studentId)
  }
}

export const studentsService = new StudentsService()
