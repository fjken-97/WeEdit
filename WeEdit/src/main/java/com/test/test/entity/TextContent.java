package com.test.test.entity;

public class TextContent {
    private Integer contentId;
    private String contentAbout;
    private String contentLast;
    private Integer textId;
    private String textTitle;

    public Integer getContentId() {
        return contentId;
    }

    public void setContentId(int contentId) {
        this.contentId = contentId;
    }

    public String getContentAbout() {
        return contentAbout;
    }

    public void setContentAbout(String contentAbout) {
        this.contentAbout = contentAbout;
    }

    public String getContentLast() {
        return contentLast;
    }

    public void setContentLast(String contentLast) {
        this.contentLast = contentLast;
    }

    public Integer getTextId() {
        return textId;
    }

    public void setTextId(int textId) {
        this.textId = textId;
    }

    public String getTextTitle() {
        return textTitle;
    }

    public void setTextTitle(String textTitle) {
        this.textTitle = textTitle;
    }
}
