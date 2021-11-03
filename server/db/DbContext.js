import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BookSchema } from '../models/Books'
import { ClassSchema } from '../models/Class'
import { EnrollmentSchema } from '../models/Enrollment'
import { StudentSchema } from '../models/student'
import { GalaxySchema } from '../models/Galaxy'
import { PlanetSchema } from '../models/Planet'
import { ValueSchema } from '../models/Value'
import { StarSchema } from '../models/Star'

class DbContext {
  Values = mongoose.model('Value', ValueSchema)
  Account = mongoose.model('Account', AccountSchema)
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts')
  Classes = mongoose.model('Class', ClassSchema)
  Students = mongoose.model('Student', StudentSchema)
  Books = mongoose.model('Book', BookSchema)
  Enrollments = mongoose.model('Enrollment', EnrollmentSchema)
Galaxies = mongoose.model('Galaxy', GalaxySchema)
Planets = mongoose.model('Planet', PlanetSchema)
Stars = mongoose.model('Star', StarSchema)
}

export const dbContext = new DbContext()
