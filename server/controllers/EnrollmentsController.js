import { Auth0Provider } from '@bcwdev/auth0provider'
import { enrollmentsService } from '../services/EnrollmentsService'
import BaseController from '../utils/BaseController'

export class EnrollmentsController extends BaseController {
  constructor() {
    super('api/enrollments')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      // NEver trust the client
      req.body.creatorId = req.userInfo.id
      const enrollment = await enrollmentsService.create(req.body)
      // custom status code
      return res.status(201).send(enrollment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const enrollmentId = req.params.id
      await enrollmentsService.remove(enrollmentId, userId)
      return res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
