import authRouter from './authRouter'
import userRouter from './userRouter'
import categoryMedicineRouter from './categoryMedicineRouter'
import diagonosisRouter from './diagnosisRouter'
import categoryDiseaseModel from './categoryDiseaseRouter'
import medicineRouter from './medicineRouter'
import diseaseRouter from './diagnosisRouter'

const routes = [
  authRouter,
  userRouter,
  categoryMedicineRouter,
  categoryDiseaseModel,
  diagonosisRouter,
  medicineRouter,
  diseaseRouter
]

export default routes;