import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const PlanetSchema = new Schema({
  name: { type: String, required: true },
  starId: { type: ObjectId, required: true, ref: 'Star' },
  creatorId: { type: ObjectId, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

PlanetSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

PlanetSchema.virtual('star', {
  localField: 'starId',
  ref: 'Star',
  foreignField: '_id',
  justOne: true
})
