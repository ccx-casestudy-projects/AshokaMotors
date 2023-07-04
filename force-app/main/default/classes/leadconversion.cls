public  with sharing class  leadconversion 
{
    public static void l(id myLead){
        Database.LeadConvert lc = new Database.LeadConvert();
        lc.setLeadId(myLead);
        LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
        lc.setConvertedStatus(convertStatus.MasterLabel);
        Database.LeadConvertResult lcr = Database.convertLead(lc);
        System.assert(lcr.isSuccess());
        
        }
}