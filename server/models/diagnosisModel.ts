import mongoose from 'mongoose'
import { IDiagnosis } from '../config/interface'

const diagnosisSchema = new mongoose.Schema({
  user: { type: String, ref: 'user' },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  account:{
    type: Object,
    ref: 'user'
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  price:{
    type: Number,
    require: true
  },
  preciption:{
    type: Array,
    require: true
  },
  diagnosisType:{
    type: Array,
    require: true
  }
}, {
  timestamps: true
})


export default mongoose.model<IDiagnosis>('diagnosis', diagnosisSchema)