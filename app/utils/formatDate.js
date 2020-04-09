export default class formatDate {
    constructor() {
    }

    static dateToYearMonthDay(date){
        return date.getFullYear()+"-"+('0' + (date.getMonth()+1)).slice(-2)+"-"+date.getDate();
    }

    static dateToDayMonthYear(date){
        return ('0' + date.getDate()).slice(-2)+"/"+('0' + (date.getMonth()+1)).slice(-2)+"/"+date.getFullYear();
    }

    static dateToYearMonthDayHourMinutes(date){
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " +date.getHours()+":"+date.getMinutes();
    }

    static datePickerToDate(date){
        return ('0' + date.day).slice(-2) + "/" + ('0' + date.month).slice(-2) + "/" + date.year;
    }

    static timePickerToDate(date){
        return ('0' + date.hour).slice(-2) + ":" + ('0' + date.minute).slice(-2);    }
}
