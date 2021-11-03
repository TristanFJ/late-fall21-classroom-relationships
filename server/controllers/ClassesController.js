import { Auth0Provider } from '@bcwdev/auth0provider'
import { classesService } from '../services/ClassesService'
import BaseController from '../utils/BaseController'

export class ClassesController extends BaseController {
  constructor() {
    super('api/classes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const classes = await classesService.getAll(query)
      return res.send(classes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const classResult = await classesService.getById(req.params.id)
      return res.send(classResult)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newClass = await classesService.create(req.body)
      return res.send(newClass)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await classesService.edit(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await classesService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
