public class AmCustomerDetailController
{
    @AuraEnabled (cacheable=true)
    public static List<Lead> getPhoneNum(string ph)
    {
        List<Lead> cts= [SELECT Id,Phone,Address,Aadhar_Number__c FROM Lead where Phone=:ph];  
        
        system.debug(cts);
        
        return cts;
    }
    
    //passing cid to here from js
    
    @AuraEnabled 
    public static void createCST(id cid) 
    {
        
        Lead css=[SELECT Id,Name,Phone,Address,Aadhar_Number__c FROM Lead where id=:cid];
        
        
    }
    
}