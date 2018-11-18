package function;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class sqlLink{
	private static String driver;
	private static String url;
	private static String username;
	private static String password;
	static {
		driver ="com.mysql.cj.jdbc.Driver";
		url="jdbc:mysql://localhost:3306/vote_info?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
		username="root";
		password="980417";
	}
	public static Connection open()
	{
		try {
			Class.forName(driver);
			return DriverManager.getConnection(url,username,password);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return null;
	}
	public static void close(Connection conn)
	{
		if(conn!=null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}

