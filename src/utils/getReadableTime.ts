export const getReadableTime = (dateObject: Date) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const date = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();

    const formattedDate = `${date} ${month}, ${year}`;

    const hours = dateObject.getHours() % 12 || 12;
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const seconds = dateObject.getSeconds().toString().padStart(2, "0");
    const meridian = hours >= 12 ? "PM" : "AM";

    const formattedTime = `${hours}:${minutes}:${seconds} ${meridian}`;

    return `${formattedTime} - ${formattedDate}`;
};
