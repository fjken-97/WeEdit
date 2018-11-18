package function;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import tools.tool;
public class Vote {
	public static boolean voteJudge(String voteID,String userID,int num) {
		Connection conn= sqlLink.open();
		int voteAttri = 0;
		String sql1 = "SELECT voteAttri From vote_infomation WHERE voteID="+voteID;
		String sql2 = "SELECT * FROM user_condition WHERE voteID="+voteID+" AND userID="+userID;
		String sql3 = sql2+" AND choiceNumber="+num;
		try {
			Statement stmt1 = conn.createStatement();
			ResultSet rs1 = stmt1.executeQuery(sql1);
			while(rs1.next()) {
				voteAttri=rs1.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		//System.out.println(voteAttri);
		if(voteAttri==1) {
			
			try {
				Statement stmt2 = conn.createStatement();
				ResultSet rs2=stmt2.executeQuery(sql2);
				while(rs2.next()) {
					if(rs2.getString("userID")!=null)
						System.out.println("此投票为单选，您只能选择一个选项！");
						return false;
					}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		else if(voteAttri==0) {
			try {
				Statement stmt3 = conn.createStatement();
				ResultSet rs3=stmt3.executeQuery(sql3);
				while(rs3.next()) {
					
					if(rs3.getString("userID")!=null) {
						System.out.println(voteAttri);
						System.out.println("您已经投过该选项了！");
						return false;
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return true;
	}
	
	public static boolean vote(String userID,String voteID,int num) {
		Connection conn= sqlLink.open();
		if(!Vote.voteJudge(voteID, userID,num)) {
			//System.out.println(1);
			return false;
		}
		//System.out.println(1);
		String sql ="SELECT choice_cnt FROM vote_choice WHERE voteID="+voteID+" AND choiceNumber="+num;
		String current_Time = tools.tool.getTime();;
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs=stmt.executeQuery(sql);
			int count=0;
			while(rs.next()) {
			count=rs.getInt("choice_cnt")+1;
			}
			String update="UPDATE vote_choice  SET choice_cnt="+count+" WHERE voteID="+voteID+" AND choiceNumber="+num;
			String Insert="INSERT INTO user_condition(userID,voteID,choiceNumber,vote_time)"
					+ " VALUES("+userID+","+voteID+","+num+","+"'"+current_Time+"'";
			Insert = Insert + ")";
			//System.out.println(Insert);
			stmt.executeUpdate(update);
			stmt.executeUpdate(Insert);
			sqlLink.close(conn);
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		System.out.println("投票成功！");
		return true;
	}
	
	
	public static boolean comment(String voteID,String userID,String remark) {
		
		Connection conn= sqlLink.open();
		String sql = "INSERT INTO vote_comm(voteID,userID,comment) VALUES("+voteID+","+userID+","+"'"+remark+"'"+")";
		try {
			Statement stmt = conn.createStatement();
			 stmt.executeUpdate(sql);
			
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("评论失败！");
			return false;
		}
		System.out.println("评论成功！");
		return true;
	}

}
