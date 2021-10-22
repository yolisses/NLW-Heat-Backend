import axios from "axios"
import { sign } from "jsonwebtoken"
import { db } from "../db"

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string
    login: string
    id: number
    name: string
}

export class AuthenticateUserService {
    async execute(code: string) {
        const url = `https://github.com/login/oauth/access_token`

        const { data: accesTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                code,
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET
            },
            headers: {
                "Accept": 'application/json'
            }
        })

        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accesTokenResponse.access_token}`
            }
        })

        const {
            name,
            login,
            avatar_url,
            id: github_id,
        } = response.data

        let user = await db.user.findFirst({ where: { github_id } })

        if (!user) {
            user = await db.user.create({
                data: {
                    name,
                    login,
                    github_id,
                    avatar_url,
                }
            })
        }

        const token = sign({
            user: {
                id: user.id,
                name: user.name,
                avatar_url: user.avatar_url,
            },

        },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            })

        return { user, token }
    }
}