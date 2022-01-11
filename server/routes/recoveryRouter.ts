import express from "express";
import recoveryCtrl from "../controllers/recoveryCtrl";

const router = express.Router();

router.post("/get-recovery", recoveryCtrl.getRecovery);

export default router;
