import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const BookSchema = new Schema({
  title: { type: String, required: true },
  classId: { type: ObjectId, required: true, ref: 'Class' },
  creatorId: { type: ObjectId, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

BookSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
// we use this virtual to populate 'class' in the booksService
BookSchema.virtual('class', {
  localField: 'classId',
  ref: 'Class',
  foreignField: '_id',
  justOne: true
})
