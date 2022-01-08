import { IReqAuth } from "../config/interface";
import { Request, Response } from "express";
import Medicines from "../models/medicineModel";
import Categories from "../models/categoryMedicineModel";

const medicineCtrl = {
	createMedicine: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		const { name, description, category, producer, ingredient } = req.body;
		if (!category) {
			return res.status(400).json({ msg: "Medicine must be have category" });
		}

		const listMedicineCategory = await Categories.find();
		if (
			category.length !== listMedicineCategory[0]._id.toString().length ||
			listMedicineCategory.length === 0
		) {
			return res.status(400).json({ msg: "Cant not find any category!" });
		}

		const isExistCategory = await Categories.findById(category);
		if (!isExistCategory?._id)
			return res.status(400).json({ msg: "Cant not find any category!" });

		try {
			const newMedicine = new Medicines({
				name,
				description,
				category,
				producer,
				ingredient,
			});

			await newMedicine.save();
			return res.status(200).json({ msg: "Created successfully" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getMedicine: async (req: Request, res: Response) => {
		try {
			const medicine = await Medicines.findById(req.params.id);
			res.json(medicine);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getAllMedicine: async (req: Request, res: Response) => {
		try {
			const medicines = await Medicines.find();
			return res.status(200).json(medicines);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	updateMedicine: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const medicine = await Medicines.findOneAndUpdate(
				{
					_id: req.params.id,
					user: req.user._id,
				},
				req.body
			);

			if (!medicine)
				return res.status(400).json({ msg: "Invalid Authentication." });

			res.status(200).json({ msg: "Update Success!", medicine });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deleteMedicine: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			// Delete Blog
			const medicine = await Medicines.findOneAndDelete({
				_id: req.params.id,
				user: req.user._id,
			});

			if (!medicine)
				return res.status(400).json({ msg: "Invalid Authentication." });

			res.status(200).json({ msg: "Delete Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default medicineCtrl;
