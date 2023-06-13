const Authen = require("../classes/Authen.class");
const User = require("../classes/User.class");
const knex = require("../plugins/knex");
const user = new User(knex)
const authen = new Authen(user)

module.exports = {
	authen
}