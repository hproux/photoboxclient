export default class formatDate {
    constructor() {
    }

    static dateToYearMonthDay(date){
        return date.getFullYear()+"-"+(Number(date.getMonth())+1)+"-"+date.getDate();
    }

    static dateToDayMonthYear(date){
        return date.getDate()+"/"+(Number(date.getMonth())+1)+"/"+date.getFullYear();
    }

    static dateToYearMonthDayHourMinutes(date){
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " +date.getHours()+":"+date.getMinutes();
    }
}
