import moment from "moment-timezone";

export const teams = ["Luna", "Apollo", "Ranger"]

export const colors: any = {
    "A": "#FF5733",
    "B": "#54AA63",
    "C": "#E231E2",
    "D": "#7854BC",
    "E": "#111169",
    "F": "#FFAB54",
    "G": "#78CDE2",
    "H": "#0E4A0F",
    "I": "#FF00FF",
    "J": "#C0C0C0",
    "K": "#0C3F47",
    "L": "#8C54E5",
    "M": "#78110C",
    "N": "#FF007F",
    "O": "#54E578",
    "P": "#3E0C47",
    "Q": "#654321",
    "R": "#1F2E02",
    "S": "#450D54",
    "T": "#123456",
    "U": "#789ABC",
    "V": "#663611",
    "W": "#13579B",
    "X": "#2468AC",
    "Y": "#9BCE24",
    "Z": "#8C0A1B"
}

export const eyeIcon = "eye"
export const eyeWithLineIcon = "eye-with-line"

declare global {
    var dateTime: {
        date: string,
        dateTime: string,
        day: number,
        dayOfWeek: string,
        dstActive: boolean,
        hour: number,
        milliSeconds: number,
        minute: number,
        month: number,
        seconds: number,
        time: string,
        timeZone: string,
        year: number
    };
}

export const getDateTime = async () => {

    const timeZone = moment.tz.guess() ?? "Asia/Kolkata"
    const response = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`, { method: 'GET' })
    const data = await response.json()
    global.dateTime = data
    return data
}