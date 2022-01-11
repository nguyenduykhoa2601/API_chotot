import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import RecoveryToken from "../models/recoveryToken";

const recoveryCtrl = {
	getRecovery: async (req: Request, res: Response) => {
		const { account, result } = req.body;
		const findAccount = await Users.findOne({ account });

		if (!findAccount) return res.json("Account does not exist!");

		let isExist = false;
		const listHashs = await RecoveryToken.find();
        for ( let i =0; i<listHashs.length; i++){
            let isMatch = await bcrypt.compare(result + account, listHashs[i].passHash);
            if(isMatch){
                isExist = true
                break
            }
        }

		if (!isExist) {
			return res.json("Cant not find any hash");
		} else {
			const token = findAccount._id;
			return res.status(200).json({ token });
		}
	},
};

export default recoveryCtrl;
