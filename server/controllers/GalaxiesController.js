import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { galaxiesService } from '../services/GalaxiesService'
import { Forbidden } from '../utils/Errors'
import { dbContext } from '../db/DbContext'

export class GalaxiesController extends BaseController {
  constructor() {
    super('api/galaxies')
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
      const galaxies = await galaxiesService.getAll(query)
      return res.send(galaxies)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const galaxyResult = await galaxiesService.getById(req.params.id)
      return res.send(galaxyResult)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newGalaxy = await galaxiesService.create(req.body)
      return res.send(newGalaxy)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const galaxy = await galaxiesService.edit(req.body)
      return res.send(galaxy)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const galaxyId = req.params.id
      await galaxiesService.remove(galaxyId, userId)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
