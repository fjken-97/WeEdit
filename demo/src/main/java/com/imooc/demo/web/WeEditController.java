package com.imooc.demo.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.imooc.demo.dao.WeEdit;
import com.imooc.demo.entity.VoteInfo;
import com.imooc.demo.service.WeEditService;

@RestController
@RequestMapping("/superadmin")
public class WeEditController {
	@Autowired
	private WeEditService weEditService;

	//投票操作接口
	@RequestMapping(value = "/vote", method = RequestMethod.GET)
	private String vote(String voteID,String userID, int num) {
		if(!weEditService.deadLineJudge(voteID)){
			return "你来晚了小老弟";
			}
		if(!weEditService.voteJudge(voteID,userID,num)) {
			return "你已经投过了小老弟";
		}
		weEditService.addUserCondition(voteID, userID, num);
		weEditService.addCount(voteID,num);
		return "success";
		
	}
	
	//发布投票接口
	@RequestMapping(value = "/launchVote", method = RequestMethod.GET)
	private String launchVote(String voteID,String userID,String deadLine,int isFaceless,int voteAttri) {
		
		if(weEditService.getVoteInfoById(voteID)!=null) {
			return "重复发布投票";
		}
		
		weEditService.addVoteInfo(voteID, userID, deadLine, isFaceless, voteAttri);
		return "发布投票成功";
	}
	
	//添加选项接口
	@RequestMapping(value = "/addChoice", method = RequestMethod.GET)
	private String addChoice(String voteID,String choice,int num) {
		
		weEditService.insertChoice(voteID, choice, num);
		return "添加选项成功";
	}
	
	//删除投票接口
	@RequestMapping(value = "/deleteVote", method = RequestMethod.GET)
	private String deleteVote(String voteID) {
		
		weEditService.deleteVoteInfo(voteID);
		return "删除投票成功";
	}
	
	//投票评论接口
	@RequestMapping(value = "/voteComm", method = RequestMethod.GET)
	private String voteComm(String voteID,String userID,String comm) {
		weEditService.addComm(voteID, userID, comm);
		return "投票评论成功";
	}
}
//	/**
//	 * 通过区域Id获取区域信息
//	 * 
//	 * @return
//	 */
//	@RequestMapping(value = "/getvoteInfobyid", method = RequestMethod.GET)
//	private Map<String, Object> getVoteInfoById(Integer voteInfoId) {
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		// 获取区域信息
//		VoteInfo voteInfo = voteInfoService.getVoteInfoById(voteInfoId);
//		modelMap.put("voteInfo", voteInfo);
//		return modelMap;
//	}
//
//	/**
//	 * 添加区域信息
//	 * 
//	 * @param voteInfoStr
//	 * @param request
//	 * @return
//	 * @throws IOException
//	 * @throws JsonMappingException
//	 * @throws JsonParseException
//	 */
//	@RequestMapping(value = "/addvoteInfo", method = RequestMethod.POST)
//	private Map<String, Object> addVoteInfo(@RequestBody VoteInfo voteInfo)
//			throws JsonParseException, JsonMappingException, IOException {
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		// 添加区域信息
//		modelMap.put("success", voteInfoService.addVoteInfo(voteInfo));
//		return modelMap;
//	}
//
//	/**
//	 * 修改区域信息，主要修改名字
//	 * 
//	 * @param voteInfoStr
//	 * @param request
//	 * @return
//	 * @throws IOException
//	 * @throws JsonMappingException
//	 * @throws JsonParseException
//	 */
//	@RequestMapping(value = "/modifyvoteInfo", method = RequestMethod.POST)
//	private Map<String, Object> modifyVoteInfo(@RequestBody VoteInfo voteInfo)
//			throws JsonParseException, JsonMappingException, IOException {
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		// 修改区域信息
//		modelMap.put("success", voteInfoService.modifyVoteInfo(voteInfo));
//		return modelMap;
//	}
//
//	@RequestMapping(value = "/removevoteInfo", method = RequestMethod.GET)
//	private Map<String, Object> removeVoteInfo(Integer voteInfoId) {
//		Map<String, Object> modelMap = new HashMap<String, Object>();
//		// 修改区域信息
//		modelMap.put("success", voteInfoService.deleteVoteInfo(voteInfoId));
//		return modelMap;
//	}
//
////}
