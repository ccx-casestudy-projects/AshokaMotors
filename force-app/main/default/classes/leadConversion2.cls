public class leadConversion2 
{
    @Auraenabled
     public static void createlead(id lead)
    {
        Lead lds = [SELECT Id, FirstName, LastName, Company, Email, Phone 
                    FROM Lead where id=:lead ];
        Account newlacc= new Account();
        if(lds.LastName == lds.Company)
            {
                newlacc.name=lds.Company;
                newlacc.Email__c = lds.Email;
                newlacc.RecordTypeId='0125i000001VpU4AAK';
                insert newlacc;
                Database.LeadConvert lc = new Database.LeadConvert();
                lc.setLeadId(lds.Id);
                lc.setAccountId(newlacc.Id);
               
                lc.setDoNotCreateOpportunity(True);
                lc.setConvertedStatus('Closed - Converted');
                Database.LeadConvertResult lcr = Database.convertLead(lc);
           delete lds;
            }
            else 
            {
                newlacc.Name=lds.Company;
                insert newlacc;
                Contact lcon=new Contact();
                lcon.LastName=lds.LastName;
                lcon.AccountId=newlacc.Id;
                insert lcon;
                Database.LeadConvert lc = new Database.LeadConvert();
                lc.setLeadId(lds.Id);
                lc.setAccountId(newlacc.Id);
                lc.setContactId(lcon.Id);
                lc.setDoNotCreateOpportunity(True);
                lc.setConvertedStatus('Closed - Converted');
                Database.LeadConvertResult lcr = Database.convertLead(lc);
            }
}

}