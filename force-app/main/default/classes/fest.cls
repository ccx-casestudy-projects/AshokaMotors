global class fest implements Schedulable{
    
    global  void execute(SchedulableContext sc){
        // Retrieve the today's festivals
        list<AM_Festival__c> fest=[select Id,Name,AM_Festival_Name__c, AM_Date__c,AM_Years__c
                                   From AM_Festival__c
                                   where AM_Date__c=today];
        for(AM_Festival__c f:fest){
            integer DayOfMonth=f.AM_Date__c.day();
            integer month=f.AM_Date__c.month();
            string year=f.AM_Years__c;
            system.debug('Festival Name: '+f.AM_Festival_Name__c);
            system.debug('Day: '+f.AM_Date__c.day());
            system.debug('Month: '+f.AM_Date__c.month());
            system.debug('Year: '+f.AM_Years__c);
            // Calculate the Cron expression dynamically based on the custom object record's date field value
            String cronExpression='0 5 15 '+DayOfMonth+' '+month+' ? '+year;
            // Use the calculated Cron expression to schedule the job
            System.schedule('lohitha', cronExpression, new fest());   
            
            list<Messaging.SingleEmailMessage> mail = new list<Messaging.SingleEmailMessage>();
            Date today=system.today();
            EmailTemplate et = [Select Id,Subject,Description,HtmlValue,DeveloperName,Body from EmailTemplate WHERE developerName = 'Ganesh_Chaturthi_Wishes'];
            
            List<lead> con = [SELECT Id,Email,LastName
                              FROM lead
                              limit 1];
            list<string> emails=new list<string>();
            for(lead c:con){
                
                emails.add(c.Email);
                Messaging.SingleEmailMessage mails = new Messaging.SingleEmailMessage();
                mails.setToAddresses(emails);
                mails.setTargetObjectId(c.Id); 
                mails.setTemplateId(et.id);
                mail.add(mails); 
            }
            Messaging.sendEmail(mail);  
        }   
    }
}