import "dotenv/config"
import express, { json } from "express";
import { routes } from "./routes";
import http from 'http'
import { Server, Socket } from "socket.io";
import cors from 'cors'


const app = express()
export const httpServer = http.createServer(app)
export const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

io.on("connection", socket => {
    console.log(`User connected on socket ${socket.id}`)
})

app.use(cors())
app.use(json())
app.use(routes)

app.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (req, res) => {
    const { code } = req.query

    return res.json(code)
})
