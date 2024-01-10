const { isValid } = require('date-fns');

const isDate = (value) => {
    if(!value) return false;

    const isDateValid = isValid(value);

    return isDateValid;
}



module.exports = {
    isDate,
}