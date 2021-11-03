import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const EnrollmentSchema = new Schema({
  studentId: { type: ObjectId, required: true, ref: 'Students' },
  classId: { type: ObjectId, required: true, ref: 'Class' },
  creatorId: { type: ObjectId, required: true, ref: 'Profile' }
},
{ timestamps: true, toJSON: { virtuals: true } })

EnrollmentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

EnrollmentSchema.virtual('student', {
  localField: 'studentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Student'
})

EnrollmentSchema.virtual('class', {
  localField: 'classId',
  foreignField: '_id',
  justOne: true,
  ref: 'Class'
})
