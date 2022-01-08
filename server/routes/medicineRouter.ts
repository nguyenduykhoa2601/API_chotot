import express from 'express'
import  medicineCtrl from '../controllers/medicineCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/medicine', auth, medicineCtrl.createMedicine)
router.get('/all-medicine', medicineCtrl.getAllMedicine)

router.route('/medicine/:id')
  .get(medicineCtrl.getMedicine)
  .put(auth, medicineCtrl.updateMedicine)
  .delete(auth, medicineCtrl.deleteMedicine)

export default router;