import mongoose, { Schema } from "mongoose";

const roleSchema = mongoose.Schema({
	filmTitle: {
		type: String,
	},
	characterName: {
		type: String,
		required: true,
	},
	banner: {
		type: String,
		required: true,
	},
	activity: {
		rating: {
			type: Number,
		},
		ratedByCount: {
			type: Number,
		},
	},
	actor: {
		type: Schema.Types.ObjectId,
		ref: "actors",
	},
	character: {
		type: Schema.Types.ObjectId,
		ref: "characters",
	},
	movie: {
		type: Schema.Types.ObjectId,
		ref: "movies",
	},
	serie: {
		type: Schema.Types.ObjectId,
		ref: "series",
	},
	anime: {
		type: Schema.Types.ObjectId,
		ref: "snimes",
	},
});

export default mongoose.model("roles", roleSchema);
