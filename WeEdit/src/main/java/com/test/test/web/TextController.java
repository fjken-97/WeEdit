package com.test.test.web;

import com.test.test.entity.Text;
import com.test.test.entity.TextComment;
import com.test.test.entity.TextContent;
import com.test.test.service.TextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/weedit")
public class TextController {

    @Autowired
    private TextService textService;
    @RequestMapping(value = "/listtext",method = RequestMethod.GET)
    private Map<String,Object> listText(){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<Text> list = textService.queryText();
        modelMap.put("textList", list);
        return modelMap;
    }

    @RequestMapping(value = "/listtextcontent",method = RequestMethod.GET)
    private Map<String,Object> listTextContent(Integer textId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<TextContent> list = textService.queryTextContent(textId);
        modelMap.put("contentList", list);
        return modelMap;
    }

    @RequestMapping(value = "/listtextcomment",method = RequestMethod.GET)
    private Map<String,Object> listTextComment(Integer textId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        List<TextComment> list = textService.queryTextComment(textId);
        modelMap.put("commentList", list);
        return modelMap;
    }

    @RequestMapping(value = "/gettextheadbyid",method = RequestMethod.GET)
    private Map<String,Object> getTextHeadById(Integer textId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Text text = textService.getTextHeadById(textId);
        modelMap.put("text", text);
        return modelMap;
    }

    @RequestMapping(value = "/gettextcontentbyid",method = RequestMethod.GET)
    private Map<String,Object> getTextContentById(Integer textId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        TextContent textContent = textService.getTextContentById(textId);
        modelMap.put("textContent", textContent);
        return modelMap;
    }

    @RequestMapping(value = "/getcommentbyid",method = RequestMethod.GET)
    private Map<String,Object> getTextCommentById(Integer commentId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        TextComment textComment = textService.getTextCommentById(commentId);
        modelMap.put("textComment", textComment);
        return modelMap;
    }

    @RequestMapping(value = "/addtext",method = RequestMethod.POST)
    private Map<String,Object> addText(@RequestBody Text text){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", textService.addText(text));
        return modelMap;
    }

    @RequestMapping(value = "/addtextcontent",method = RequestMethod.POST)
    private Map<String,Object> addTextContent(@RequestBody TextContent textContent){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", textService.addTextContent(textContent));
        return modelMap;
    }

    @RequestMapping(value = "/addtextcomment",method = RequestMethod.POST)
    private Map<String,Object> addTextComment(@RequestBody TextComment textComment){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", textService.addTextComment(textComment));
        return modelMap;
    }

    @RequestMapping(value = "/modifytext",method = RequestMethod.POST)
    private Map<String, Object> modifyText(@RequestBody Text text) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", textService.modifyText(text));
        return modelMap;
    }

    @RequestMapping(value = "/modifycontent",method = RequestMethod.POST)
    private Map<String, Object> modifyText(@RequestBody TextContent textContent) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", textService.modifyTextContent(textContent));
        return modelMap;
    }

    @RequestMapping(value = "/removetext",method = RequestMethod.GET)
    private Map<String, Object> removeText(Integer textId) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", textService.deleteText(textId));
        return modelMap;
    }

    @RequestMapping(value = "/removecontent",method = RequestMethod.GET)
    private Map<String, Object> removeTextContent(Integer textContentId) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", textService.deleteTextContent(textContentId));
        return modelMap;
    }

    @RequestMapping(value = "/removecomment",method = RequestMethod.GET)
    private Map<String, Object> removeTextComment(Integer textCommentId) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", textService.deleteTextComment(textCommentId));
        return modelMap;
    }
}
