import moment from "moment-timezone";

export const teams = ["Luna", "Apollo", "Ranger"]

export const colors: any = {
    "A": "#FF5733",
    "B": "#54AA63",
    "C": "#E231E2",
    "D": "#800567",
    "E": "#111169",
    "F": "#800522",
    "G": "#78CDE2",
    "H": "#FA02F2",
    "I": "#FF00FF",
    "J": "#FA0202",
    "K": "#FA7A02",
    "L": "#053E80",
    "M": "#028FFA",
    "N": "#FF007F",
    "O": "#54E578",
    "P": "#020EFA",
    "Q": "#B802FA",
    "R": "#0E4A0F",
    "S": "#FA027E",
    "T": "#FA0227",
    "U": "#379C16",
    "V": "#05806D",
    "W": "#13579B",
    "X": "#260580",
    "Y": "#9BCE24",
    "Z": "#8C0A1B"
}

export const eyeIcon = "eye"
export const eyeWithLineIcon = "eye-with-line"

interface dateTime {
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

export const getDateTime = async () => {

    const timeZone = moment.tz.guess() ?? "Asia/Kolkata"
    const response = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`, { method: 'GET' })
    const data: dateTime = await response.json()
    return data
}