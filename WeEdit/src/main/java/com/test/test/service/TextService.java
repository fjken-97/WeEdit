package com.test.test.service;

import com.test.test.entity.Text;
import com.test.test.entity.TextComment;
import com.test.test.entity.TextContent;

import java.util.List;

public interface TextService {
//***********************************呈现列表部分***********************************
    /**
     * 获取文章列表
     *
     * @return
     */
    List<Text> queryText();
    /**
     * 获取文章段落列表
     *
     * @return
     */
    List<TextContent> queryTextContent(Integer textId);
    /**
     * 获取文章评论列表
     *
     * @return
     */
    List<TextComment> queryTextComment(Integer textId);
//***********************************插入部分***********************************
    /**
     * 增加文章信息
     *
     * @param text
     * @return
     */
    int addText(Text text);
    /**
     * 增加文章信息
     *
     * @param textContent
     * @return
     */
    int addTextContent(TextContent textContent);
    /**
     * 增加文章信息
     *
     * @param textComment
     * @return
     */
    int addTextComment(TextComment textComment);
//***********************************获取部分***********************************
    /**
     * 通过文章Id获取文章信息
     *
     * @param textId
     * @return
     */
    Text getTextById(Integer textId);
    /**
     * 通过文章Id获取题头信息
     *
     * @param textId
     * @return
     */
    Text getTextHeadById(Integer textId);
    /**
     * 通过文章段落Id获取段落信息
     *
     * @param textId
     * @return
     */
    TextContent getTextContentById(Integer textId);
    /**
     * 通过文章评论Id获取评论信息
     *
     * @param textCommentId
     * @return
     */
    TextComment getTextCommentById(Integer textCommentId);
//***********************************删除部分***********************************
    /**
     * 删除文章信息
     *
     * @param textId
     * @return
     */
    boolean deleteText(int textId);
    /**
     * 删除文章段落信息
     *
     * @param textContentId
     * @return
     */
    boolean deleteTextContent(int textContentId);
    /**
     * 删除文章评论信息
     *
     * @param textCommentId
     * @return
     */
    boolean deleteTextComment(int textCommentId);
//***********************************更新部分***********************************
    /**
     * 修改文章信息
     *
     * @param text
     * @return
     */
    boolean modifyText(Text text);
    /**
     * 修改文章段落信息
     *
     * @param textContent
     * @return
     */
    boolean modifyTextContent(TextContent textContent);
    /**
     * 修改文章评论信息
     *
     * @param textComment
     * @return
     */
    boolean modifyTextComment(TextComment textComment);

}
