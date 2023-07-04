trigger CustomerRegistrationEmail on Lead (after insert)
{

    for(Lead l:trigger.new){ 
    
emailtemplate et=[select id,name from emailtemplate where name='CustomerRegistrationTemplate'];

Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
message.setTargetObjectId(l.id);
//Get templete id for set the templete.
message.setTemplateID(et.Id);
message.toAddresses = new String[] { l.email};
Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message};
Messaging.SendEmailResult[] results =Messaging.sendEmail(messages);
}

}