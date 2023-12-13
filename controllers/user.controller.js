import db from "../db.js"

class UserController {
    async createUser(req, res) {
        const {first_name, last_name} = req.body
        const dbRes = await db.query('INSERT INTO person (first_name, last_name) values ($1, $2) RETURNING *', [first_name, last_name])
        res.status(200).json(dbRes?.rows[0])
    }

    async getUsers(req, res) {
        const dbRes = await db.query('SELECT * FROM person')
        res.status(200).json(dbRes?.rows)
    }

    async getOneUser(req, res) {
        const id = req?.params?.id
        const dbRes = await db.query('SELECT * FROM person where id = $1', [id])
        res.status(200).json(dbRes?.rows[0])
    }

    async updateUser(req, res) {
        const {first_name, last_name, id} = req.body
        const dbRes = await db.query(`UPDATE person set first_name = $1, last_name = $2 where id = $3 RETURNING *`, [first_name, last_name, id])
        res.status(200).json(dbRes?.rows[0])
    }

    async deleteUser(req, res) {
        const id = req?.params?.id
        const dbRes = await db.query(`DELETE FROM person where id = $1 RETURNING *`, [id])
        res.status(200).json(dbRes?.rows[0])
    }
}

export default new UserController()