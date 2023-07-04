public class LeadConversion1 
{
    public static void l()
    {
       list <lead> oldl=[select id, Name,lastname,Company,Email from lead  ];
       
        for(lead lds:oldl)
        {
            if(lds.lastname == lds.Company)
            {
                 Account newlacc= new Account();
                newlacc.name=lds.Company;
                newlacc.RecordTypeId='0125i000001VpTuAAK';
             insert newlacc;
            }
            else 
            {
                Account newlacc1= new Account();
                newlacc1.Name=lds.Company;
                insert newlacc1;
                Contact lcon=new Contact();
                lcon.LastName=lds.LastName;
                lcon.AccountId=newlacc1.Id;
                insert lcon;
                
            }
       
        }
       system.debug('hiii');
        
    }
    

}