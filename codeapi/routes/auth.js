const express = require("express");
const { authen } = require("../controllers/service");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const loginValidate = [body("username").exists().withMessage("username is required"), body("password").exists().withMessage("password is required")];
const registerValidate = [body("username").exists().withMessage("username is required"), body("password").exists().withMessage("password is required"), body("name").exists().withMessage("name is required"), body("email").exists().withMessage("email is required")];

router.post("/login", loginValidate, async (req, res) => {
	console.log(loginValidate)
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ success: false, errors: errors.array() });
		}
		const { username, password } = req.body;
		const result = await authen.login(username, password);
		return res.status(200).json({ success: true, data: result });
	} catch (error) {
		console.error(error);
		return res.status(401).json({ success: false, error: error.message });
		
	}
});

router.post("/register", registerValidate, async (req, res) => {
	try {
		const { username, password, name, email } = req.body;
		const result = await authen.register(username, password, name, email);
		return res.status(201).json({ success: true, data: result });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, error: error.message });
	}
});

module.exports = router;
