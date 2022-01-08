import mongoose from 'mongoose'
import { IDisease } from '../config/interface'

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  category: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})


export default mongoose.model<IDisease>('diagnosis', diseaseSchema)