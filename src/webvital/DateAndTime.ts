
interface YMDHM {
	year: string,
	month: string,
	day: string,
	hour: string,
	min: string,

}
var getFull = function getFull(date = new Date()): YMDHM {

	let month = (date.getMonth() + 1) + '';
	let year = date.getFullYear() + '';
	let day = date.getDate() + '';
	let min = date.getMinutes() + '';
	let hour = date.getHours() + '';
	month = addFrontZero(month)
	day = addFrontZero(day)
	hour = addFrontZero(hour)
	min = addFrontZero(min)
	return { year, month, day, hour, min }
}

const addFrontZero = function (numStr: string) {
	return Number(numStr) > 9 ? numStr : "0" + numStr

}


const dateType = function dateType(type: string, obj: YMDHM) {
	switch (type) {
		case "-":
			return formatCrossLine(obj)
		case "/":
			return slant(obj)
		case "zh":
			return ZH(obj)
		default:
			return formatToSpaceDate(obj)
	}
}

/**
 * 格式化 2020-12-12 12:12
 * @param obj YMDHM
 * @returns 2020-12-12 12:12
 */
const formatToSpaceDate = function formatToSpaceDate(obj: YMDHM) {
	return obj.year + "" + obj.month + "" + obj.day + "" + obj.hour + "" + obj.min + '00'
}
/**
 * 格式化 2020-12-12 12:12
 * @param obj YMDHM
 * @returns 2020-12-12 12:12
 */
const formatCrossLine = function formatCrossLine(obj: YMDHM) {
	return obj.year + "-" + obj.month + "-" + obj.day + " " + obj.hour + ":" + obj.min
}
/**
 * 格式化 2020/12/12 12:12
 * @param obj  YMDHM
 * @returns 2020/12/12 12:12
 */
const slant = function slant(obj: YMDHM) {
	return obj.year + "/" + obj.month + "/" + obj.day + " " + obj.hour + ":" + obj.min
}
/**
 * 2020年12月12日 12时12分
 * 默认00分保留到小时
 * @param obj YMDHM
 * @returns 2020年12月12日 12时12分
 */
const ZH = function ZH(obj: YMDHM, hasMin = false) {

	let str = obj.year + "年" + obj.month + "月" + obj.day + "日" + obj.hour + "时"
	if (Number(obj.min) > 0)
		return str += obj.min + "分"
	else if (hasMin) {
		return str += obj.min + "分"
	}
	return str
}

/**
 * 2019101811300000 格式转换成年、月、日、时、分
 * @param strDate 2019101811300000
 * @returns YMDHM  {
		year,
		month,
		day,
		hour,
		min
	}
 */
const strToYMdM = function strToYMdM(strDate: string): YMDHM {
	let year = strDate.slice(0, 4),
		month = strDate.slice(4, 6),
		day = strDate.slice(6, 8),
		hour = strDate.slice(8, 10),
		min = strDate.slice(10, 12)
	return {
		year,
		month,
		day,
		hour,
		min
	}
}




/**
 * 将标准格式日期格式或者日期对象转换成 YMDHM
 */
const formatStr = function formatStr(date1: any) {
	if (typeof date1 == 'string')
		date1 = new Date(date1)
	return getFull(date1)

}



/**
 * 日期类，一些常用的日期函数的封装
 */
class DateUtil {
	public static instance = new DateUtil();
	public static getInstance() {
		return this.instance;
	}

	private constructor() { }
	/**
 *
 * @param d
 * @param type 日期连接符 zh  / -
	 * @param isHour=true 分钟为0
 * @returns {*|string}
 */
	formatDate(date: Date, type = '', isHour = false) {
		if (isHour) {
			date = new Date(date.valueOf())
			date.setMinutes(0)
		}

		return dateType(type, getFull(date))

	}
	/**
	 * 不同日期类型格式转换
	 * @param strDate el: 日期类型字符串 2020-12-01 12:23:23
	 * @param type el: /
	 * @returns 根据type返回类型  2020/12/01 12:23:23
	 */
	formatToFormat(strDate: string, type = '') {
		let t = type.toLowerCase()
		if (typeof strDate !== "string")
			throw "replace must be string"
		strDate = strDate.replace(/分/ig, "")
		strDate = strDate.replace(/时/ig, ":")
		switch (t) {
			case "/":
				return strDate.replace(/[-,年,月,/]/ig, "/").replace(/日/ig, " ")
			case "-":
				return strDate.replace(/[-,年,月,/]/ig, "-").replace(/日/ig, " ")
			case "zh":
				strDate = strDate.replace(/[-,年,月,/," " , :]/ig, "").replace(/日/ig, "")
				return dateType(t, strToYMdM(strDate))
			default:
				return strDate.replace(/[-,年,月,/," " , :]/ig, "").replace(/日/ig, "")

		}

	}
	/**
 * 格式化无空格字符串日期， 例如2019101811300000
 * @param str 2019101811300000
 * @type 连接符
 * @returns string
 */
	formatNoSpaceDate(strDate: string, type = '/') {
		return dateType(type, strToYMdM(strDate))
	}
	/**
* 判断是否为同一时
* @param date1 Date | DateString
* @param date2 Date | DateString
* @returns Boolean
*/
	isSameMin(date1: any, date2: any) {
		const date1Obj = formatStr(date1)
		const date2Obj = formatStr(date2)
		if (date1Obj.year == date2Obj.year && date1Obj.month == date2Obj.month && date1Obj.day == date2Obj.day && date1Obj.hour == date2Obj.hour && date1Obj.min == date2Obj.min) {
			return true;
		}
		return false;
	}
	/**
 * 判断是否为同一时
 * @param date1 Date | DateString
 * @param date2 Date | DateString
 * @returns Boolean
 */
	isSameHour(date1: any, date2: any) {
		const date1Obj = formatStr(date1)
		const date2Obj = formatStr(date2)
		if (date1Obj.year == date2Obj.year && date1Obj.month == date2Obj.month && date1Obj.day == date2Obj.day && date1Obj.hour == date2Obj.hour) {
			return true;
		}
		return false;
	}
	/**
 * 判断是否为同一日
 * @param date1 Date | DateString
 * @param date2 Date | DateString
 * @returns Boolean
 */
	isSameDate(date1: any, date2: any) {
		const date1Obj = formatStr(date1)
		const date2Obj = formatStr(date2)
		if (date1Obj.year == date2Obj.year && date1Obj.month == date2Obj.month && date1Obj.day == date2Obj.day) {
			return true;
		}
		return false;
	}
	/**
	 * 判断是否为同一月
	 * @param date1 Date | DateString
	 * @param date2 Date | DateString
	 * @returns Boolean
	 */
	isSameMonth(date1: any, date2: any) {
		const date1Obj = formatStr(date1)
		const date2Obj = formatStr(date2)
		if (date1Obj.year == date2Obj.year && date1Obj.month == date2Obj.month) {
			return true;
		}
		return false;

	}

	/**
	 * 判断是否为同一年
	 * @param date1 Date | DateString
	 * @param date2 Date | DateString
	 * @returns Boolean
	 */
	isSameYear(date1: any, date2: any) {
		const date1Obj = formatStr(date1)
		const date2Obj = formatStr(date2)
		if (date1Obj.year == date2Obj.year) {
			return true;
		}
		return false;
	}

	/**
	 * 两个日期的差值分钟
	 * @param date1 Date
	 * @param date2 Date
	 * @returns  number
	 */
	diff(date1: Date, date2: Date, abs = true) {
		const mins = (date1.getTime() - date2.getTime()) / (60 * 1000)
		if (abs)
			return Math.floor(Math.abs(mins));
		return Math.floor(mins);
	}
	/**
	 * 向下取最近5分钟日期 例如：0， 5， 10， 15.....
	 * @param date Date对象
	 * @param deep true 不更改传入的日期对象; flase 更改传入的日期
	 * @returns Date
	 */
	fiveFloorMinDate(date: Date, step = 5, deep = false) {
		if (deep)
			date = new Date(date.valueOf())
		let min = date.getMinutes();
		min = Math.floor(min / step) * step
		date.setMinutes(min);
		date.setSeconds(0)
		date.setMilliseconds(0)
		return date;
	}
	/**
	 * 向下取最近小时 例如：10：00， 11：00，
	 * @param date Date对象
	 * @param deep true 不更改传入的日期对象; flase 更改传入的日期
	 * @returns Date
	 */
	floorHourDate(date: Date, deep = false) {
		if (deep)
			date = new Date(date.valueOf())
		date.setMinutes(0);
		date.setSeconds(0)
		date.setMilliseconds(0)
		return date;
	}
	/**
	 *
	 * @param date Date
	 * @param type 格式化类型
	 */
	worldFormat(date: Date, type = '') {
		const d = new Date(date.valueOf())
		d.setHours(d.getHours() - 8);
		return this.formatDate(d, type)
	}





}

// export {
// 	// formatDate,
// 	// formatToFormat,
// 	// formatNoSpaceDate,
// 	// isSameDate,
// 	// isSameMonth,
// 	// isSameYear
// }

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
export default DateUtil.getInstance();
