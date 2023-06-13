class User {
	constructor(knex) {
		this.knex = knex;
		this.tableName = 'user';
	}

	async getAll(limit = 100, sort = '', sortBy = 'asc') {
		try {
			const query = this.knex(this.tableName).select('*');
			if (sort) {
				query.orderBy(sort, sortBy);
			}
			const results = await query.limit(limit);
			return results;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async getById(id) {
		try {
			const result = await this.knex(this.tableName).where({ id }).first();
			return result;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async getBy(whereAttr, limit = 100, sort = '', sortBy = 'asc') {
		try {
			const query = this.knex(this.tableName).where(whereAttr);
			if (sort) {
				query.orderBy(sort, sortBy);
			}
			const results = await query.limit(limit);
			return results;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

 async getFirstBy(whereAttr) {
		try {
			const result = await this.knex(this.tableName).where(whereAttr).first();
			return result;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	async create(data) {
		try {
			const result = await this.knex(this.tableName).insert(data);
			return result[0];
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async update(id, data) {
		try {
			const result = await this.knex(this.tableName).where({ id }).update(data);
			return await this.getById(id);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async delete(id) {
		try {
			const result = await this.knex(this.tableName).where({ id }).del();
			return result;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

module.exports = User;