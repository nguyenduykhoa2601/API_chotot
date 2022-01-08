import { Request, Response } from "express";
import Diagnosis from "../models/diagnosisModel";
import Users from "../models/userModel";
import { IReqAuth } from "../config/interface";

const Pagination = (req: IReqAuth) => {
	let page = Number(req.query.page) * 1 || 1;
	let limit = Number(req.query.limit) * 1 || 4;
	let skip = (page - 1) * limit;

	return { page, limit, skip };
};

const diagnosisCtrl = {
	createDiagnosis: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const { title, account, preciption, description, price, diagnosisType } =
				req.body;

			const user = await Users.findOne({ account }).select("-password");
			if (!user) {
				return res.status(400).json({ msg: "Can not find any patient!" });
			}

			const newDiagnosis = new Diagnosis({
				user: req.user.account,
				title: title.toLowerCase(),
				account: user,
				description,
				price,
				preciption,
				diagnosisType,
			});

			await newDiagnosis.save();

			const newDiagnosisList = user.diagnosis;
			newDiagnosisList.push(newDiagnosis);
			await Users.findOneAndUpdate(
				{ _id: user?._id },
				{
					diagnosis: newDiagnosisList,
				}
			);

			return res.status(200).json({ msg: "Created new diagnosis" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getAllDiagnosis: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const diagnosis = await Diagnosis.find()
			res.status(200).json(diagnosis);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	sharedDiagnosis: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Invalid Authentication." });

		const { account } = req.body;
		const diagnosisShared = await Diagnosis.findById(req.params.id);
		const parentShared = await Users.findOne({ account }).select("-password");

		if (!parentShared) {
			return res.status(400).json({ msg: "This person is not your parent!" });
		}

		const newDiagnosisParentShared = parentShared.diagnosisShared;
		newDiagnosisParentShared.push(diagnosisShared);
		try {
			await Users.findOneAndUpdate(
				{ _id: parentShared._id },
				{
					diagnosisShared: newDiagnosisParentShared,
				}
			);

			res.status(200).json({ msg: "Shared to your parent" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getDiagnosis: async (req: Request, res: Response) => {
		try {
			const diagnosis = await Diagnosis.findOne({
				_id: req.params.id,
			}).populate("user", "-password");

			if (!diagnosis)
				return res.status(400).json({ msg: "Diagnosis does not exist." });

			return res.json(diagnosis);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	updateDiagnosis: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			const diagnosis = await Diagnosis.findOneAndUpdate(
				{
					_id: req.params.id,
					user: req.user._id,
				},
				req.body
			);

			if (!diagnosis)
				return res.status(400).json({ msg: "Invalid Authentication." });

			res.status(200).json({ msg: "Update Success!", diagnosis });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deleteDiagnosis: async (req: IReqAuth, res: Response) => {
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({ msg: "Invalid Authentication." });

		try {
			// Delete Blog
			const diagnosis = await Diagnosis.findOneAndDelete({
				_id: req.params.id,
				user: req.user._id,
			});

			if (!diagnosis)
				return res.status(400).json({ msg: "Invalid Authentication." });

			res.status(200).json({ msg: "Delete Success!" });
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
	searchDiagnosis: async (req: Request, res: Response) => {
		try {
			const diagnosis = await Diagnosis.aggregate([
				{
					$search: {
						index: "searchTitle",
						autocomplete: {
							query: `${req.query.title}`,
							path: "title",
						},
					},
				},
				{ $sort: { createdAt: -1 } },
				{ $limit: 5 },
				{
					$project: {
						title: 1,
						description: 1,
						price: 1,
						createdAt: 1,
					},
				},
			]);

			if (!diagnosis.length)
				return res.status(400).json({ msg: "No Diagnosis." });

			res.status(200).json(diagnosis);
		} catch (err: any) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

export default diagnosisCtrl;
