package com.function;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import com.init.Text;
import com.database.LinkDataBase;
public class Edit {
	
	public static void textEntry() throws ClassNotFoundException, SQLException {
		//记录标题
		String title = "";
		//记录文本
		String content = "";
		//记录编辑者
		int authorID = 0;
		
		//记录发布时间
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd EEEE  HH:mm");
	    String date = df.format(new Date());
	    
	    LinkDataBase.dataEntry(title,content,authorID,date);    
	}
	
	public static void contentCut() throws ClassNotFoundException, SQLException {
		int textID = 0;
		String content = LinkDataBase.getContent(textID);
		String[] sentences = content.split("[! ? .]");
		for (int point=0;point<sentences.length;point++){
			LinkDataBase.textCutEntry(point+1,sentences[point]);
            System.out.println(sentences[point]);
        }
	}

	
}
