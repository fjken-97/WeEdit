package op;
import function.voteConcerning;

import java.awt.List;

import function.sqlLink;
public class test {
	public static void main(String[] args) {
		String voteID="001";
		String userID="002";
		String choice_01="黄毓明";
		String choice_02="黄玉米";
		String Time=tools.tool.getTime();
//		function.voteConcerning.launch(voteID, userID, Time, Time, 0, 0);
//		function.voteConcerning.addChoice(voteID, choice_01, 1);
//		function.Vote.vote(userID, voteID, 1);
//		function.Vote.vote(voteID, voteID, 1);
		//showData.showVoteCondition.showCount(voteID);
		java.util.List list=showData.showVoteCondition.showInfo(voteID);
		int i = 0;
		for(i = 0;i<list.size();i++) {
			System.out.print(list.get(i)+" ");
			if(i%3==2)System.out.println();
		}
	}

}
