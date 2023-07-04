global class SendWishes  
{
    global static void execute() 
    {
        Date day=system.today();
        List<AM_Festival__c> fests = [SELECT AM_Festival_Name__c,AM_Years__c,AM_Date__c
                                      FROM AM_Festival__c];
                /*                      WHERE AM_Date__c=:day ];
        for(AM_Festival__c f:fests){
            system.debug(f);
            sendmail();
        }
        public void sendmail(){
            list<Account> accs=[select name,email from account];
            List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
            EmailTemplate emailTemp = [Select id, Subject, Body From EmailTemplate Where DeveloperName = 'Independence_Day_Wishes'];
            Contact con = [Select Id, Email from Contact where LastName ='Test'];
            
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setTemplateId(emailTemp.Id);
            mail.setTargetObjectId(con.Id);
            emailList.add(mail);
            
            if(!emailList.isEmpty()){
                Messaging.sendEmail(emailList);
            }    
        }*/
    }                              
}