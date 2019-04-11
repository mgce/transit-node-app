export class DateHelper{
    public static dateWithoutTime(date:Date):Date{
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
    }

    public static startOfMonth(date:Date):Date{
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            1
          );
    }

    public static endOfMonth(date:Date):Date{
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
          );
    }
}