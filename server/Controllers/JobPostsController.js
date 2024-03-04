const JobPostModel = require("../Models/JobPostModel");

module.exports.jobpost = async (req, res, next) => {
	try {
		const jobPost = await JobPostModel.create(req.body);
		if (jobPost) {
			res.status(201).json({ user: jobPost._id, created: true });
		}
		// await jobPost
		//     .save()
		//     .then((item) => {
		//         res.status(201).json({ user: jobPost._id, created: true });
		//     })
		//     .catch((err) => {
		//         res.status(400).json({ created: false });
		//     });
		next();
	} catch (e) {
		res.json({ e, created: false });
	}
};

module.exports.getjobs = async (req, res, next) => {
	try {
		const jobs = await JobPostModel.find({});
		res.send(jobs);
	} catch (e) {
		res.json({ e, created: false });
	}
};
