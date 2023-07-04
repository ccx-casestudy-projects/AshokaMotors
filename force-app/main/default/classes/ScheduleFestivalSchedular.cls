public class ScheduleFestivalSchedular implements Schedulable
{	
    public string etname;
    public  ScheduleFestivalSchedular(String etname){
        this.etname=etname;
    }
    public void execute(SchedulableContext sc)
    {
        EmailTemplate et=new EmailTemplate();
        et=[select id,name
            from EmailTemplate
            where name=:etname];
        
        List<contact> lds = [SELECT Id,Email,Name
                          FROM contact];
        list<id> ids=new list<id>();
        for(contact l:lds){
            ids.add(l.id);
        }
        Messaging.MassEmailMessage  mails = new Messaging.MassEmailMessage();
        // mails.setToAddresses(emails);
        mails.setTargetObjectIds(ids);
        mails.setTemplateId(et.id);
        Messaging.SendEmailResult[] res=Messaging.sendEmail(new Messaging.MassEmailMessage [] {mails});
    }
}