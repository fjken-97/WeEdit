package function;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import function.sqlLink;
public class voteConcerning {

	public static String launch(String voteID,String userID,String Ltime,String deadLine,int i,int j) {
		Connection conn=sqlLink.open();
		String sql = "INSERT INTO vote_infomation(voteID,userID,launchTime,deadLine,isFaceless,voteAttri)"
				+ " VALUES("+voteID+","+userID+","+"'"+Ltime+"'"+","+"'"+deadLine+"'"+","+i+","+j+")";

		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.executeUpdate(sql);
			//System.out.println("insert success!");
			sqlLink.close(conn);
		} catch (SQLException e) {
			System.out.println("发起投票失败！");
			e.printStackTrace();
		}
		System.out.println("发起投票成功！");
		return voteID;
	}
	
	public static boolean addChoice(String voteID,String choice,int num) {
		Connection conn= sqlLink.open();
		String sql = "INSERT INTO vote_choice(voteID,choice,choice_cnt,choiceNumber) VALUES("+voteID+","+"'"+choice+"'"+","+0+","+num+")";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.executeUpdate(sql);
			//System.out.println("Insert success!");
			sqlLink.close(conn);
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("添加选项失败！");
		}
		System.out.println("添加选项成功！");
		return true;
	}
	
	public static boolean deleteVote(String voteID){
		
		Connection conn= sqlLink.open();
		String sql = "DELETE FROM vote_infomation WHERE voteID="+voteID;
		try {
			Statement stmt = conn.createStatement();
			 stmt.executeUpdate(sql);
			
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("删除投票失败！");
			return false;	
		}
		System.out.println("删除投票成功！");
		return true;
	}
}

	

