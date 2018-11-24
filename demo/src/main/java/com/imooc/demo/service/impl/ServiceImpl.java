package com.imooc.demo.service.impl;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.imooc.demo.dao.WeEdit;
import com.imooc.demo.entity.UserCondition;
import com.imooc.demo.entity.VoteChoice;
import com.imooc.demo.entity.VoteComm;
import com.imooc.demo.entity.VoteInfo;
import com.imooc.demo.service.WeEditService;
import com.imooc.demo.tools.*;


@Service
public class ServiceImpl implements WeEditService {
	@Autowired
	private WeEdit weEdit;


	@Override
	public VoteInfo getVoteInfoById(String voteInfoId) {
		return weEdit.queryVoteInfoById(voteInfoId);
	}

	

	@Transactional
	@Override
	public boolean deleteVoteInfo(String voteInfoId) {
		weEdit.deleteVoteInfo(voteInfoId);
		return true;
		
	}

	@Override
	public boolean addVoteInfo(String voteID,String userID,String deadLine,int isFaceless,int voteAttri) {
		String curTime = tool.getTime();
		VoteInfo voteInfo = new VoteInfo();
		voteInfo.setDeadLine(deadLine);
		voteInfo.setIsFaceless(isFaceless);
		voteInfo.setUserID(userID);
		voteInfo.setLaunchTime(curTime);
		voteInfo.setVoteAttri(voteAttri);
		voteInfo.setVoteID(voteID);
		weEdit.queryVoteInfoById(voteID);
		weEdit.insertVoteInfo(voteInfo);
		return true;
	}

	
	@Override
	public boolean insertChoice(String voteID,String choice,int num) {
		VoteChoice voteChoice = new VoteChoice();
		voteChoice.setChoice(choice);
		voteChoice.setChoiceNumber(num);
		voteChoice.setVoteID(voteID);
		voteChoice.setChoiceCount(0);
		weEdit.insertChoice(voteChoice);
		return true;
	}
	@Transactional
	@Override
	public boolean deadLineJudge(String voteID) {
		VoteInfo temp = getVoteInfoById(voteID);
		
		String curTime = tool.getTime();
		String deadLine = temp.getDeadLine();
		if(curTime.compareTo(deadLine)>=0) {
			return false;
		}
		return true;
	}
	
	@Override
	public boolean addCount(String voteID,int num) {
		int count = weEdit.queryCountByID(voteID, num).getChoiceCount() + 1;
		weEdit.updateCount(count, voteID, num);
		return true;
	}
	
	
	@Override
	public boolean voteJudge(String voteID,String userID,int num) {
		int voteAttri = getVoteInfoById(voteID).getVoteAttri();
		if(voteAttri==1) {
			UserCondition temp = weEdit.queryConditionBy2ID(voteID,userID);
			if(temp!=null) {
				return false;
			}
		}
		else if(voteAttri==0) {
			UserCondition temp = weEdit.queryConditionBy3ID(voteID, userID, num);
			if(temp!=null) {
				return false;
			}
		}
		return true;
	}
	@Override
	public boolean addUserCondition(String voteID,String userID,int choiceNumber) {
		UserCondition userCondition = new UserCondition();
		String voteTime = tool.getTime();
		userCondition.setChoiceNumber(choiceNumber);
		userCondition.setUserID(userID);
		userCondition.setVoteID(voteID);
		userCondition.setVoteTime(voteTime);
		weEdit.insertUserCondition(userCondition);
		return true;
		}



	@Override
	public boolean addComm(String voteID, String userID, String comm) {
		
		VoteComm voteComm = new VoteComm();
		voteComm.setUserID(userID);
		voteComm.setVoteID(voteID);
		voteComm.setComment(comm);
		weEdit.insertVoteComm(voteComm);
		return false;
	}

	
	

}
