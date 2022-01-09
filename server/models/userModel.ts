import mongoose from 'mongoose'
import { IUser } from '../config/interface'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"],
    trim: true,
    maxLength: [30, "Your name is up to 30 chars long."]
  },
  account: {
    type: String,
    required: [true, "Please add your identity"], //email or phone
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please add your password"]
  },
  avatar: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Logo_UIT_updated.jpg/1200px-Logo_UIT_updated.jpg'
  },
  role: {
    type: String,
    default: 'user' // admin 
  },
  type: {
    type: String,
    default: 'register' // login
  },
  address:{
    type: String,
    default: ''
  },
  email:{
    type:String,
    default:''
  },
  phone:{
    type:String,
    default: ''
  },
  birthDay:{
    type: Date,
    default: ''
  },
  gender:{
    type: Number,
    default: 0
  },
  height:{
    type: Number,
    default: 0
  },
  weight:{
    type: Number,
    default: 0
  },
  lifeStyle:{
    type: String,
    default: ''
  },
  parent:{
    type: Array,
    default: []
  },
  diagnosis:{
    type: Array,
    default: []
  },
  diagnosisShared:{
    type: Array,
    default: []
  },
  token:{
    type: Number,
    default: 0
  },
  rf_token: { type: String, select: false }
}, {
  timestamps: true
})

export default mongoose.model<IUser>('user', userSchema)