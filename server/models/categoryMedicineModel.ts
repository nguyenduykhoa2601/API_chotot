import mongoose from 'mongoose'

const categoryMedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your category"],
    trim: true,
    unique: true,
  }
}, {
  timestamps: true
})

export default mongoose.model('categoryMedicine', categoryMedicineSchema)