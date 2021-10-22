import axios from "axios"

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

        return response.data
    }
}