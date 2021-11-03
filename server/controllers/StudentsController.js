import { Auth0Provider } from '@bcwdev/auth0provider'
import { classesService } from '../services/ClassesService'
import { studentsService } from '../services/StudentsService'
import BaseController from '../utils/BaseController'

export class StudentsController extends BaseController {
  constructor() {
    super('api/students')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/classes', this.getClasses)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const students = await studentsService.getAll(query)
      return res.send(students)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const student = await studentsService.getById(req.params.id)
      return res.send(student)
    } catch (error) {
      next(error)
    }
  }

  async getClasses(req, res, next) {
    try {
      const classes = await classesService.getByStudentId(req.params.id)
      return res.send(classes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NEver trust the client
      req.body.creatorId = req.userInfo.id
      const student = await studentsService.create(req.body)
      // custom status code
      return res.status(201).send(student)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NEver trust
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const student = await studentsService.edit(req.body)
      return res.send(student)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const studentId = req.params.id
      await studentsService.remove(studentId, userId)
      return res.send('Expelled')
    } catch (error) {
      next(error)
    }
  }
}
