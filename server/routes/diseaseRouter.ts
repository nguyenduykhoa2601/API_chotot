import express from 'express'
import  diseaseCtrl from '../controllers/diseaseCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/disease', auth, diseaseCtrl.createDisease)
router.get('/all-disease', diseaseCtrl.getAllDisease)

router.route('/disease/:id')
  .get(diseaseCtrl.getDisease)
  .put(auth, diseaseCtrl.updateDisease)
  .delete(auth, diseaseCtrl.deleteDisease)

export default router;