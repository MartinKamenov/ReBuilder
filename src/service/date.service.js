export const monthsLong = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
export const monthsShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export const daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const dateFormatTypes = {
    'Material': 'materialCardExample'
};

const dateFormats = {
    materialCardExample: (date) => {
        return `${monthsLong[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}\n${date.getHours()}:${date.getMinutes()}`;
    }
};

const dateService = {
    formatDate: (date, format) => {
        return dateFormats[format](date);
    }
};

export default dateService;