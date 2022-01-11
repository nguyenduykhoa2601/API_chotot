import mongoose from "mongoose";
import { IRecoveryToken } from "../config/interface";

const recoveryHashSchema = new mongoose.Schema(
	{
		token: {
			type: String,
			require: true,
		},
		passHash: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IRecoveryToken>("recovery-hash", recoveryHashSchema);
