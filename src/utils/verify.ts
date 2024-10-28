/**
 * 身份证校验
 * @param idCardNumber string
 */
export function validateIDCard(idCardNumber:string): boolean {
    const idCardPattern =
        /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
    if (!idCardPattern.test(idCardNumber)) {
        return false;
    }
    const birthdate = idCardNumber.substring(6, 14);
    const year = parseInt(birthdate.substring(0, 4), 10);
    const month = parseInt(birthdate.substring(4, 2), 10);
    const day = parseInt(birthdate.substring(6, 2), 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > 31) {
        return false;
    }
    if ([4, 6, 9, 11].includes(month) && day === 31) {
        return false;
    }
    if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return day <= 29;
        } else {
            return day <= 28;
        }
    }
    return true;
}
