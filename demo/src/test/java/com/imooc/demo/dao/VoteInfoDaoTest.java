package com.imooc.demo.dao;

import static org.junit.Assert.assertEquals;

import java.util.Date;
import java.util.List;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.imooc.demo.entity.UserCondition;
import com.imooc.demo.entity.VoteChoice;
import com.imooc.demo.entity.VoteComm;
import com.imooc.demo.entity.VoteInfo;
import com.imooc.demo.service.WeEditService;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING) // 按方法名大小升序执行
public class VoteInfoDaoTest {
	//通过spring容器注入Dao的实现类
	@Autowired
	private WeEdit weEdit;
	private WeEditService www;

//	@Test
//	public void testAQueryVoteInfo() {
////		List<VoteInfo> voteInfoList = voteInfoDao.queryVoteInfo();
////		// 验证预期值和实际值是否相符
////		assertEquals(1, voteInfoList.size());
////	}
//		//www.addCount("4665", 1);
//	//@Test
//	www.getVoteInfoById("voteID");
//	assertEquals(1,1);
//	}

//	@Test
//	public void testCQueryVoteInfoById() {
//		VoteInfo voteInfo = voteInfoDao.queryVoteInfoById(2);
//		assertEquals("东苑", voteInfo.getVoteInfoName());
//	}
//
//	@Test
//	public void testDUpateVoteInfo() {
//		List<VoteInfo> voteInfoList = voteInfoDao.queryVoteInfo();
//		for (VoteInfo voteInfo : voteInfoList) {
//			if ("测试区域".equals(voteInfo.getVoteInfoName())) {
//				// 对比之前的priority值
//				assertEquals(1, voteInfo.getPriority().intValue());
//				voteInfo.setPriority(2);
//				int effectedNum = voteInfoDao.updateVoteInfo(voteInfo);
//				assertEquals(1, effectedNum);
//			}
//		}
//	}
//
//	@Test
//	public void testEDeleteVoteInfo() {
//		List<VoteInfo> voteInfoList = voteInfoDao.queryVoteInfo();
//		voteInfoDao.deleteVoteInfo("1");
//		// 重新获取一次列表，看看总数是否少1
//		voteInfoList = voteInfoDao.queryVoteInfo();
//		assertEquals(0, voteInfoList.size());
//	}
}
