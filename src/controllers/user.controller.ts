import { Request, Response } from 'express'
import Person from '../model/Person'
import { ValidationError } from 'sequelize'

class UserController {
  async create(req: Request, res: Response) {
    const { age, first_name, last_name } = req.body
    const newUser = await Person.create({ age, first_name, last_name }).catch(
      (e: ValidationError) => {
        const message = e?.errors?.[0]?.message
        const type = e?.errors?.[0]?.type
        switch (type) {
          case 'notnull violation':
            res.status(401).json(message)
            break

          default:
            res.status(500).json(message)
            break
        }
      }
    )
    res.status(200).json(newUser)
  }

  async getAll(req: Request, res: Response) {
    const allUsers = await Person.findAll().catch((e: ValidationError) => {
      const message = e?.errors?.[0]?.message
      res.status(500).json(message)
    })
    res.status(200).json(allUsers)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params
    const user = await Person.findByPk(id).catch((e: ValidationError) => {
      const message = e?.errors?.[0]?.message
      const type = e?.errors?.[0]?.type
      switch (type) {
        case 'notnull violation':
          res.status(401).json(message)
          break

        default:
          res.status(500).json(message)
          break
      }
    })
    res.status(200).json(user ? user : 'The person doesnt exists')
  }

  async update(req: Request, res: Response) {
    const newUser = req.body
    const updatedUser = await Person.update(newUser, {
      where: { id: newUser.id },
      returning: true,
    }).catch(
      (e: ValidationError) => {
        const message = e?.errors?.[0]?.message
        const type = e?.errors?.[0]?.type
        switch (type) {
          case 'notnull violation':
            res.status(401).json(message)
            break

          default:
            res.status(500).json(message)
            break
        }
      }
    )
    res.status(200).json(updatedUser[1][0])
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const deletedUser = await Person.destroy({ where: { id } }).catch(
      (e: ValidationError) => {
        const message = e?.errors?.[0]?.message
        const type = e?.errors?.[0]?.type
        switch (type) {
          case 'notnull violation':
            res.status(401).json(message)
            break

          default:
            res.status(500).json(message)
            break
        }
      }
    )
    res.status(200).json(deletedUser ? { message: `User with id=${id} deleted`, id } : 'Person doesnt exists')
  }
}

export default new UserController()
