package com.imooc.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.imooc.demo.entity.VoteChoice;
import com.imooc.demo.entity.VoteInfo;
@Service
public interface WeEditService {


	VoteInfo getVoteInfoById(String voteInfoId);

	boolean addVoteInfo(String voteID,String userID,String deadLine,int isFaceless,int voteAttri);
	
	boolean addCount(String voteID,int num);
	
	boolean deleteVoteInfo(String voteInfoId);
	
	boolean insertChoice(String voteID,String choice,int num);
	
	boolean deadLineJudge(String voteID);
	
	boolean voteJudge(String voteID,String userID,int num);
	
	boolean addUserCondition(String voteID,String userID,int choiceNumber);
	
	boolean addComm(String voteID,String userID,String comm);
	
}
