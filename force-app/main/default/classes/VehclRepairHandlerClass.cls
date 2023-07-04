public class VehclRepairHandlerClass 
{
    public static void insertrep(list<Product2> pds)
    {
        for(Product2 p:pds)
        {
            list<AM_Vehicle_Repairs__c> rvp=new list<AM_Vehicle_Repairs__c>();
            rvp=[select id,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c where AM_Vehicle_Number__c=:p.Id];       
            
            if(rvp.size()==0)
            {
                if(p.AM_Repair_Required__c==True)
                {
                    AM_Vehicle_Repairs__c vrp=new AM_Vehicle_Repairs__c();
                    vrp.AM_Vehicle_Number__c=p.id;
                    insert vrp;
                }
            }
        } 
    }
    
    
    public static void updatevehstatus(list<Product2> pds)
    {
        for(Product2 p:pds)
        {
            if(p.AM_Repair_Required__c==True)
            {
                p.AM_Vehicle_Status__c='In-Repair';
            }
        }
    }
    
    
    public static void Updaterep(list<AM_Vehicle_Repairs__c> pdsr)
    {
        for(AM_Vehicle_Repairs__c p:pdsr)
        {
            list<AM_Vehicle_Repairs__c> rvps=new list<AM_Vehicle_Repairs__c>();
            rvps=[select id,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c where AM_Vehicle_Number__c=:p.AM_Vehicle_Number__c];
            
            if(rvps.size()==1)
            {
                if(p.AM_Repair_Status__c=='Completed')
                {
                    Product2 pd=new Product2();
                    for(AM_Vehicle_Repairs__c r:rvps)
                    {
                        pd=[select id,AM_Repair_Required__c from Product2 where id=:r.AM_Vehicle_Number__c];
                        pd.AM_Repair_Required__c=false;
                        pd.AM_Vehicle_Status__c='Available';
                        
                    }
                    update pd;
                }
                if(p.AM_Repair_Total_Amount__c!=null)
                {
                    Product2 pds=new Product2();
                    for(AM_Vehicle_Repairs__c r:rvps)
                    {
                        pds=[select name,AM_Repair_Amount__c from Product2 where id=:r.AM_Vehicle_Number__c];
                    }
                    pds.AM_Repair_Amount__c=p.AM_Repair_Total_Amount__c;
                    update pds;
                }
            }
        }        
    }
    
    
    public static void priceBookEntry(list<Product2> pds)
    {
        PricebookEntry pbe=new PricebookEntry();
        
        for(Product2 p:pds)
        {
            list<PricebookEntry> pbs=new list<PricebookEntry>();
            pbs=[select id,UnitPrice from PricebookEntry where Product2Id=:p.id];
            
            if(p.AM_Vehicle_Final_Amount__c!=Null)
            { 
                if(pbs.size()==1)
                {
                    PricebookEntry pnb =new PricebookEntry();
                    pnb=[select id,UnitPrice from PricebookEntry where Product2Id=:p.id];
                    
                    pnb.UnitPrice=p.AM_Vehicle_Final_Amount__c;                    
                    update pnb;
                }
                else 
                {
                    pbe.UnitPrice=p.AM_Vehicle_Final_Amount__c;
                    pbe.Product2Id=p.Id;
                    pbe.Pricebook2Id='01s5i00000FJAz7AAH';
                    
                    insert pbe;
                }
                
            }
        }
    }
    public static void repairDetailStatus(list<AM_Vehicle_Repair_Details__c> pds)
    {
        boolean b=true;
        list<AM_Vehicle_Repair_Details__c> rpds=new list<AM_Vehicle_Repair_Details__c>();
        for(AM_Vehicle_Repair_Details__c rp:pds)
        {
            AM_Vehicle_Repairs__c rps=new AM_Vehicle_Repairs__c();
            rps=[select id,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c where id=:rp.AM_Vehicle_Repairs__c];
            
            rpds=[select AM_Vehicle_Repairs__c,AM_Repair_Detail_Status__c from AM_Vehicle_Repair_Details__c 
                  where AM_Vehicle_Repairs__c=:rp.AM_Vehicle_Repairs__c];
            
            for(AM_Vehicle_Repair_Details__c rip:rpds)
            {
                if(rip.AM_Repair_Detail_Status__c!='Completed')
                {
                    b=false;
                }
            }
            if(b==True)
            {
                rps.AM_Repair_Status__c='Completed';
                
                Product2 lds=[select Name,CreatedBy.email,AM_Brand__c,AM_Vehicle_Registration_Number__c from Product2 where id=:rps.AM_Vehicle_Number__c];
                EmailTemplate template = [SELECT Id, Subject, Body FROM EmailTemplate WHERE Name = 'SendEmailToOwnerAsRepairsCompleted'];
                
                // Create the email message
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setToAddresses(new List<String>{lds.CreatedBy.email});
                email.setTemplateId(template.Id);
                email.setSubject(template.Subject);
                
                // Set the merge fields in the email body
                String body = template.Body;
                body = body.replace(' {!Product2.AM_Brand__c}', lds.AM_Brand__c);
                body = body.replace(' {!Product2.Name}', lds.Name);
                
                email.setHtmlBody(body);
                Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
            }
            else
            {
                rps.AM_Repair_Status__c='Progress';
            }
            update rps;
            
            
        }
    }
}