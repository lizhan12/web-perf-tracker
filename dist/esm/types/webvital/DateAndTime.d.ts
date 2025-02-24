/**
 * 日期类，一些常用的日期函数的封装
 */
declare class DateUtil {
    static instance: DateUtil;
    static getInstance(): DateUtil;
    private constructor();
    /**
 *
 * @param d
 * @param type 日期连接符 zh  / -
     * @param isHour=true 分钟为0
 * @returns {*|string}
 */
    formatDate(date: Date, type?: string, isHour?: boolean): string;
    /**
     * 不同日期类型格式转换
     * @param strDate el: 日期类型字符串 2020-12-01 12:23:23
     * @param type el: /
     * @returns 根据type返回类型  2020/12/01 12:23:23
     */
    formatToFormat(strDate: string, type?: string): string;
    /**
 * 格式化无空格字符串日期， 例如2019101811300000
 * @param str 2019101811300000
 * @type 连接符
 * @returns string
 */
    formatNoSpaceDate(strDate: string, type?: string): string;
    /**
* 判断是否为同一时
* @param date1 Date | DateString
* @param date2 Date | DateString
* @returns Boolean
*/
    isSameMin(date1: any, date2: any): boolean;
    /**
 * 判断是否为同一时
 * @param date1 Date | DateString
 * @param date2 Date | DateString
 * @returns Boolean
 */
    isSameHour(date1: any, date2: any): boolean;
    /**
 * 判断是否为同一日
 * @param date1 Date | DateString
 * @param date2 Date | DateString
 * @returns Boolean
 */
    isSameDate(date1: any, date2: any): boolean;
    /**
     * 判断是否为同一月
     * @param date1 Date | DateString
     * @param date2 Date | DateString
     * @returns Boolean
     */
    isSameMonth(date1: any, date2: any): boolean;
    /**
     * 判断是否为同一年
     * @param date1 Date | DateString
     * @param date2 Date | DateString
     * @returns Boolean
     */
    isSameYear(date1: any, date2: any): boolean;
    /**
     * 两个日期的差值分钟
     * @param date1 Date
     * @param date2 Date
     * @returns  number
     */
    diff(date1: Date, date2: Date, abs?: boolean): number;
    /**
     * 向下取最近5分钟日期 例如：0， 5， 10， 15.....
     * @param date Date对象
     * @param deep true 不更改传入的日期对象; flase 更改传入的日期
     * @returns Date
     */
    fiveFloorMinDate(date: Date, step?: number, deep?: boolean): Date;
    /**
     * 向下取最近小时 例如：10：00， 11：00，
     * @param date Date对象
     * @param deep true 不更改传入的日期对象; flase 更改传入的日期
     * @returns Date
     */
    floorHourDate(date: Date, deep?: boolean): Date;
    /**
     *
     * @param date Date
     * @param type 格式化类型
     */
    worldFormat(date: Date, type?: string): string;
}
/**
 *@ 1、格式化日期 formatDate(Date,type='-'):string
 *@ 2、不同格式日期转换 formatToFormat(DateStr,type='-'):string
 *@ 3、格式化无分隔符日期 formatNoSpaceDate(DateStr,type='-'):string
 *@ 4、判断两个日期是否为同一日 isSameDate(Date1,Date2):boolean
 *@ 5、判断两个日期是否为同一月 isSameMonth(Date1,Date2):boolean
 *@ 6、判断两个日期是否为同一年 isSameYear(Date1,Date2):boolean
 *@ 7、两个日期之间的差值--分钟级 diff(Date1,Date2, abs:boolean):number
 *@ 8、向下取最近5分钟日期 例如：0， 5， 10， 15..... fiveFloorMinDate(Date,deep):number
 *@ 9、向下取最近小时 例如：10：00， 11：00..... floorHourDate(Date,deep):number
 *
 */
declare const _default: DateUtil;
export default _default;
