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

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const meridian = hours >= 12 ? "PM" : "AM";

    const formattedTime = `${hours % 12 || 12}:${minutes
        .toString()
        .padStart(2, "0")} ${meridian}`; // Example output: "9:01 AM"

    return `${formattedTime} - ${formattedDate}`;
};
