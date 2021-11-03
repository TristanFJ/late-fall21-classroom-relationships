import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EnrollmentsService {
  async create(body) {
    const enrollment = await dbContext.Enrollments.create(body)
    return enrollment
  }

  async remove(enrollmentId, userId) {
    const enrollment = await dbContext.Enrollments.findById(enrollmentId)
    if (!enrollment) {
      throw new BadRequest('invalid id')
    }
    if (enrollment.creatorId.toString() !== userId) {
      throw new Forbidden('You lack the permission to do that')
    }
    await dbContext.Enrollments.findByIdAndDelete(enrollmentId)
  }
}
export const enrollmentsService = new EnrollmentsService()
