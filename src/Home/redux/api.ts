import { fcmAxios } from "../../common/apiWrapper";

export const sendMessage = async ({ token, from, to, message, timestamp }: { token: string, from: string, to: string, message: string, timestamp: number }) => {
    const payload = {
        to: token,
        priority: "high",
        content_available: true,
        data: { timestamp, to, by: from, message }
    }
    const { data } = await fcmAxios.post("/send", payload)

    return data;
}