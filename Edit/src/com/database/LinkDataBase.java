package com.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class LinkDataBase {
	
	static String driver = "com.mysql.jdbc.Driver";
	static String url = "jdbc:mysql://localhost:3306/db_weedit";
	static String user = "root";
	static String password = "root";
	
	public static Connection getConnect() throws SQLException, ClassNotFoundException {
		Class.forName(driver);
		Connection con = DriverManager.getConnection(url,user,password);
		return con;
	}
	
	public static void dataEntry(String title,String content,int authorID,String date) throws SQLException, ClassNotFoundException {
		Connection con = getConnect();
		if(!con.isClosed())
            System.out.println("Succeeded connecting to the Database!");
		else
			System.out.println("Succeeded connecting to the Database!");
        String insert_SQL = "insert into edit(title,content,authorID,date) values(?,?,?,?)";
        PreparedStatement stmt_textentry = con.prepareStatement(insert_SQL);   //会抛出异常
        stmt_textentry.setString(1, title);         
        stmt_textentry.setString(2, content);    
        stmt_textentry.setInt(3, authorID);   
        stmt_textentry.setString(4, date); 
        stmt_textentry.executeUpdate();
        con.close();
        initText();
	}
	
	public static void initText() throws SQLException, ClassNotFoundException {
		
		Connection con = getConnect();
		if(!con.isClosed())
            System.out.println("Succeeded connecting to the Database!");
		else
			System.out.println("Succeeded connecting to the Database!");
		String cut_insert_SQL = "insert into text(textID) values(?)";
        PreparedStatement stmt_textcut = con.prepareStatement(cut_insert_SQL);
        
	}
	
	public static String getContent(int textID) throws ClassNotFoundException, SQLException {
		Connection con = getConnect();
		if(!con.isClosed())
            System.out.println("Succeeded connecting to the Database!");
		else
			System.out.println("Succeeded connecting to the Database!");
		Statement statement = con.createStatement();
		String select_content_SQL = "select * from edit where textID=? ";
		PreparedStatement pstmt=con.prepareStatement(select_content_SQL);
		pstmt.setInt(1, textID);
		ResultSet rs = statement.executeQuery(select_content_SQL);
        System.out.println("-----------------");
        System.out.println("执行结果如下所示:");  
        System.out.println("-----------------"); 
        String content = rs.getString("content");
        System.out.println(content);
	    return content;     	
	}

	public static void textCutEntry(int point, String sentence) {
		
		
	}
}
