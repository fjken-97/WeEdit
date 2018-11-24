package com.imooc.demo.dao;


import org.apache.ibatis.annotations.Param;

import com.imooc.demo.entity.UserCondition;
import com.imooc.demo.entity.VoteChoice;
import com.imooc.demo.entity.VoteComm;
import com.imooc.demo.entity.VoteInfo;

public interface WeEdit {

	VoteInfo queryVoteInfoById(String voteID);

	int insertVoteInfo(VoteInfo voteInfo);


	int updateVoteInfo(VoteInfo voteInfo);

	int deleteVoteInfo(String string);
	
	boolean insertChoice(VoteChoice voteChoice);
	
	boolean insertVoteComm(VoteComm voteComm);
	
	boolean insertUserCondition(UserCondition userCondition);
	
	UserCondition queryConditionBy2ID(@Param("voteID")String voteID,@Param("userID")String userID);
	
	UserCondition queryConditionBy3ID(@Param("voteID")String voteID,@Param("userID")String userID,@Param("choiceNumber")int choiceNumber);
	
	VoteChoice queryCountByID(@Param("voteID")String voteID,@Param("choiceNumber")int choiceNumber);
	
	boolean updateCount(@Param("count")int count,@Param("voteID")String userID,@Param("choiceNumber")int choiceNumber);
	
}
