import axios from "axios"
import token from "./token.js"

async function login(loginApi) {
    try {
        let formData = new FormData()
        formData.append("client_id", "wayto-oauth-client-id")
        formData.append("client_secret", "wayto-oauth-client-secret")
        formData.append("grant_type", "password")
        formData.append("username", "zhaoyi")
        formData.append("password", "zhaoyi")

        const response = await axios.post(loginApi, formData, {
            baseURL: token.baseUrl,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
        token.token = "Bearer " + response.data.access_token
        // eslint-disable-next-line no-console
        console.log("登录成功:" + token.token)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

export default function (loginApi) {
    // eslint-disable-next-line no-empty
    if (!token.token) {
        // eslint-disable-next-line no-console
        console.log("重新登录:" + loginApi)
        login(loginApi)
    } else {
        // eslint-disable-next-line no-console
        console.log("已登录:" + token.token)
    }
}