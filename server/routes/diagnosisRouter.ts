import express from 'express'
import diagnosisCtrl from '../controllers/diagnosisCtrl'
import auth from '../middleware/auth'

const router = express.Router()


router.post('/diagnosis', auth, diagnosisCtrl.createDiagnosis)
router.get('/all-diagnosis', auth, diagnosisCtrl.getAllDiagnosis)

router.route('/diagnosis/:id')
  .get(diagnosisCtrl.getDiagnosis)
  .put(auth, diagnosisCtrl.updateDiagnosis)
  .delete(auth, diagnosisCtrl.deleteDiagnosis)
  .post(auth, diagnosisCtrl.sharedDiagnosis)

router.get('/diagnosis/diagnosises', diagnosisCtrl.searchDiagnosis)


export default router;