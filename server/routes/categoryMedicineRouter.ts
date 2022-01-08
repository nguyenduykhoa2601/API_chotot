import express from 'express'
import categoryCtrl from '../controllers/categoryMedicineCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/category-medicine')
  .get(categoryCtrl.getCategories)
  .post(auth, categoryCtrl.createCategory)

router.route('/category-medicine/:id')
  .patch(auth, categoryCtrl.updateCategory)
  .delete(auth, categoryCtrl.deleteCategory)

export default router;