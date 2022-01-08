import mongoose from 'mongoose'

const categoryDiseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your category"],
    trim: true,
    unique: true,
  }
}, {
  timestamps: true
})

export default mongoose.model('categoryDisease', categoryDiseaseSchema)