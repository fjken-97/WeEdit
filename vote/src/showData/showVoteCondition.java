package showData;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import function.sqlLink;

public class showVoteCondition {
	
	public static int showCount(String voteID) {
		Connection conn= sqlLink.open();
		String sql = "SELECT COUNT(DISTINCT(userID)) FROM user_condition WHERE voteID="+voteID;
		int count = 0;
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {
				count = rs.getInt(1);
				System.out.println(count);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return count;
	}
	
	public static List showInfo(String voteID){
		Connection conn= sqlLink.open();
		List<String> list = new ArrayList();
		String sql = "SELECT * FROM user_condition WHERE voteID="+voteID+" GROUP BY userID";
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()) {
				
				list.add(rs.getString(1));
				list.add(rs.getString(3));
				list.add(rs.getString(4));	
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}
}
