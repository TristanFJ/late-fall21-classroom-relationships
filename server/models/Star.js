import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const StarSchema = new Schema({
  name: { type: String, required: true },
  galaxyId: { type: ObjectId, required: true, ref: 'Galaxy' },
  creatorId: { type: ObjectId, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

StarSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

StarSchema.virtual('galaxy', {
  localField: 'galaxyId',
  ref: 'Galaxy',
  foreignField: '_id',
  justOne: true
})
