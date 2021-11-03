import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ClassSchema } from '../models/Class'
import { StudentSchema } from '../models/student'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema)
  Account = mongoose.model('Account', AccountSchema)
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts')
  Classes = mongoose.model('Class', ClassSchema)
  Students = mongoose.model('Student', StudentSchema)
}

export const dbContext = new DbContext()
