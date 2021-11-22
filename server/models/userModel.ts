import mongoose from 'mongoose'
import { IUser } from '../config/interface'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"],
    trim: true,
    maxLength: [20, "Your name is up to 20 chars long."]
  },
  account: {
    type: String,
    required: [true, "Please add your email or phone"],
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
  rf_token: { type: String, select: false }
}, {
  timestamps: true
})

export default mongoose.model<IUser>('user', userSchema)