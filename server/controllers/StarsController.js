import { Auth0Provider } from '@bcwdev/auth0provider'
import { starsService } from '../services/StarsService'
import BaseController from '../utils/BaseController'

export class StarsController extends BaseController {
  constructor() {
    super('api/stars')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const stars = await starsService.getAll(query)
      return res.send(stars)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const stars = await starsService.getById(req.params.id)
      return res.send(stars)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const star = await starsService.create(req.body)
      return res.send(star)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const star = await starsService.edit(req.body)
      return res.send(star)
    } catch (error) {
      next(error)
    }
  }
}
