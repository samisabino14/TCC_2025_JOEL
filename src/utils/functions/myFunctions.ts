

export function getFutureDate(

    day: number,
    month: number,
    year: number,
    hour: number,
    minute: number,
    second: number

) {

    const auxHour = hour > 0 && hour < 10 ? `0${hour}` : hour
    const auxDay = day > 0 && day < 10 ? `0${day}` : day
    const auxMonth = month > 0 && month < 10 ? `0${month}` : month

    const date = `${year}-${auxMonth}-${auxDay}T${auxHour}:${minute}0:${second}0.00Z`;

    return date;
}


export const generateRandomString = (myLength: number): string => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        () => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};
