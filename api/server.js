import express from 'express'
import { prisma } from "./src/utils/prisma.js";

const app = express()
app.use(express.json())

//const users = []

// GET /users - Get all users
app.get('/users', async (req, res) => {
    if(req.query.name) {
        const users = await prisma.users.findMany({
            where: {
                name: {
                    contains: req.query.name,
                    mode: 'insensitive'
                }
            }
        })
        return res.status(200).json(users)
    }
    const users = await prisma.users.findMany()
    res.status(200).json(users)
})

// GET /users/:id - Get a user by id
app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    const user = await prisma.users.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
})

// POST /users - Create a new user
app.post('/users', async (req, res) => {
    // users.push(req.body)
    await prisma.users.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate, 
        }
    })

    res.status(201).json(req.body)
})

// PUT /users/:id - Update a user by id
app.put('/users/:id', async (req, res) => {
    const { id } = req.params
    await prisma.users.update({
        where: {
            id: id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate, 
        }
    })

    res.status(200).json(req.body)
})

// DELETE /users/:id - Delete a user by id
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    await prisma.users.delete({
        where: {
            id: id
        }
    })

    res.status(204).send()
})

app.post('/singin', async (req, res) => {
    const { email, birthdate } = req.body

    const user = await prisma.users.findUnique({
        where: {
            email: email,
            birthdate: birthdate
        }
    })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})


/*

    Create ur API for users

        - GET /users - Get all users
        - GET /users/:id - Get a user by id
        - POST /users - Create a new user
        - PUT /users/:id - Update a user by id
        - DELETE /users/:id - Delete a user by id
*/

/* 
    BD Info:
    username: luzayadio
    password: O1tgQ2t7yqh8Rh5x
*/