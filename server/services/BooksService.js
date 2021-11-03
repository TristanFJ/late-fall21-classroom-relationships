import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BooksService {
  async getAll(query = {}) {
    const books = await dbContext.Books.find(query)
      .populate('creator', 'name picture')
      .populate('class')
    return books
  }

  async getById(id) {
    const book = await dbContext.Books.findById(id)
      .populate('creator', 'name picture')
      .populate('class')
    if (!book) {
      throw new BadRequest('Invalid Id')
    }
    return book
  }

  async create(newBook) {
    const book = await dbContext.Books.create(newBook)
    return book
  }

  async edit(update) {
    // go get the book and the getById method will handle the check if its a valid id
    const book = await this.getById(update.id)
    if (book.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('you do not have permission to make that change')
    }
    const updated = await dbContext.Books.findByIdAndUpdate(update.id, update, { new: true })
    return updated
  }

  async remove(bookId, userId) {
    const book = await this.getById(bookId)
    if (book.creatorId.toString() !== userId) {
      throw new Forbidden('you do not have permission to make that change')
    }
    await dbContext.Books.findByIdAndDelete(bookId)
  }
}

export const booksService = new BooksService()
