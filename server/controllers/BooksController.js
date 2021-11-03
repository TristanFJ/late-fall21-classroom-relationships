import { Auth0Provider } from '@bcwdev/auth0provider'
import { booksService } from '../services/BooksService'
import BaseController from '../utils/BaseController'

export class BooksController extends BaseController {
  constructor() {
    super('api/books')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const books = await booksService.getAll(query)
      return res.send(books)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const book = await booksService.getById(req.params.id)
      return res.send(book)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NEver trust the client
      req.body.creatorId = req.userInfo.id
      const book = await booksService.create(req.body)
      // custom status code
      return res.status(201).send(book)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NEver trust
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const book = await booksService.edit(req.body)
      return res.send(book)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const bookId = req.params.id
      await booksService.remove(bookId, userId)
      return res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
