const bcrypt = require("bcrypt");
const JwtService = require("../classes/JwtService.class");
const jwt = new JwtService(process.env.JWT_SECRET);

class Authen {
	constructor(user) {
		this.user = user;
	}

	async login(username, password) {
		try {
			const user = await this.user.getFirstBy({ username });
			if (!user) {
				throw new Error("Invalid username or password!");
			}
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				throw new Error("Invalid username or password!");
			}
			const token = jwt.generateToken({
				id: user.id,
				username: user.username,
			}, "1d");
			const userData = {
				id: user.id,
				username: user.username,
				token,
			};
			return userData;
		} catch (error) {
			throw error;
		}
	}

	async register(username, password, name, email) {
		try {
			const check = await this.user.getFirstBy({ username });
			if (check) {
				throw new Error("Username already exists");
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const id = await this.user.create({ username, password: hashedPassword, name, email });
			const profile = await this.user.getById(id);
			return profile;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Authen;
