import express from 'express'
import categoryCtrl from '../controllers/categoryDiseaseCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.route('/category-disease')
  .get(categoryCtrl.getCategories)
  .post(auth, categoryCtrl.createCategory)

router.route('/category-disease/:id')
  .patch(auth, categoryCtrl.updateCategory)
  .delete(auth, categoryCtrl.deleteCategory)

export default router;