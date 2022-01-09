import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
	name: string;
	account: string;
	password: string;
	avatar: string;
	role: string;
	type: string;
	gender: number;
	parent: any;
	diagnosis: any;
	diagnosisShared: any;
	birthDay: Date;
	height: number;
	weight: number;
	lifeStyle: string;
	rf_token?: string;
	_doc: object;
}

export interface INewUser {
	name: string;
	account: string;
	password: string;
}

export interface IDecodedToken {
	id?: string;
	newUser?: INewUser;
	iat: number;
	exp: number;
}

export interface IGgPayload {
	email: string;
	email_verified: boolean;
	name: string;
	picture: string;
}

export interface IUserParams {
	name: string;
	account: string;
	password: string;
	avatar?: string;
	type: string;
}

export interface IReqAuth extends Request {
	user?: IUser;
}

export interface IComment extends Document {
	user: string;
	blog_id: string;
	blog_user_id: string;
	content: string;
	replyCM: string[];
	reply_user: string;
	comment_root: string;
	_doc: object;
}

export interface IDiagnosis extends Document {
	user: string;
	title: string;
	account: any;
	description: string;
	price: number;
	preciption: any;
	diagnosisType: any;
	_doc: object;
}

export interface IDisease extends Document {
	name: string;
	description: string;
	category: string;
}

export interface IMedicine extends Document {
	name: string;
	description: string;
	category: string;
	producer: string;
	ingredient: string;
}
