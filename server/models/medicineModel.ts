import mongoose from "mongoose";
import { IMedicine } from "../config/interface";

const medicineSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			trim: true,
		},
		description: {
			type: String,
			require: true,
			trim: true,
		},
		category: {
			type: String,
			require: true,
		},
		producer: {
			type: String,
			require: true,
		},
		ingredient: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IMedicine>("medicines", medicineSchema);
