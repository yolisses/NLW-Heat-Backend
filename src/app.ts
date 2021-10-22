import "dotenv/config"
import express, { json } from "express";
import { routes } from "./routes";

const app = express()

app.use(json())
app.use(routes)

app.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (req, res) => {
    const { code } = req.query

    return res.json(code)
})

const port = 4000
app.listen(port, () => console.info(`Server is running on http://localhost:${port}`))