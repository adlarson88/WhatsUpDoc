package com.WhatsUpDoc.PhDTracker.Services.Emailer;

import javax.mail.internet.MimeMessage;

public class EmailDetails {

    private String recipient;
    private String msgBody;
    private String subject;

    public EmailDetails() {
    }

    public EmailDetails(String recipient, String subject) {
        this.recipient = recipient;
        this.subject = subject;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getMsgBody() {
        return msgBody;
    }

    public void setMsgBody(String msgBody) {
        this.msgBody = msgBody;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

}
