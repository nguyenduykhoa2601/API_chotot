import { IReqAuth } from "../config/interface";
import { Request, Response } from "express";
import Diseases from "../models/diseaseModel";
import Categories from "../models/categoryDiseaseModel";

const diseaseCtrl = {
	createDisease: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		const { name, description, category } = req.body;
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
			const newDisease = new Diseases({
				name,
				description,
				category,
			});

			await newDisease.save();
			return res.status(200).json({ msg: "Created successfully" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getDisease: async (req: Request, res: Response) => {
		try {
			const disease = await Diseases.findById(req.params.id);
			res.json(disease);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getAllDisease: async (req: Request, res: Response) => {
		try {
			const disease = await Diseases.find();
			return res.status(200).json(disease);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	updateDisease: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const disease = await Diseases.findOneAndUpdate(
				{
					_id: req.params.id,
					user: req.user._id,
				},
				req.body
			);

			if (!disease)
				return res.status(400).json({ msg: "Invalid Authentication." });

			res.status(200).json({ msg: "Update Success!", disease });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deleteDisease: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			// Delete Blog
			const disease = await Diseases.findOneAndDelete({
				_id: req.params.id,
				user: req.user._id,
			});

			if (!disease)
				return res.status(400).json({ msg: "Invalid Authentication." });

			res.status(200).json({ msg: "Delete Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default diseaseCtrl;
