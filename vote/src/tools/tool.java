package tools;

import java.util.Calendar;

public class tool {
	public static String getTime()
	{
		
		Calendar calender=Calendar.getInstance();  
        int year=calender.get(Calendar.YEAR);  
        int month=calender.get(Calendar.MONTH);  
        int date=calender.get(Calendar.DATE);  
        int hour=calender.get(Calendar.HOUR_OF_DAY);  
        int minute=calender.get(Calendar.MINUTE);  
        int second=calender.get(Calendar.SECOND);  
        String Time=year + "/" + month + "/" + date + " " +hour + ":" +minute + ":" + second; 
//        System.out.println(Time);
        return Time;
	}
}
