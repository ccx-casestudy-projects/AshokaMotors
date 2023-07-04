public class DealerquickCmpController 
{
    // Method For Creating New Dealer Quick Reqistration Records
	 @AuraEnabled
    public static Id InsertDealerRec(String firstname,String lastname,string email,string company,string phone)
    {
        account accRec=new account();
        accRec.Name=lastname;
        accRec.Company__c=Company;
        accRec.Email__c=email;
        accRec.phone=phone;
        
        insert accRec;
        return accRec.Id;
    } 
    //Method For To Display Record According to the Searchterm
    
    @AuraEnabled(cacheable=true)
    public static Id searchDealer(String dealerCompany)
    {
        Account accs = new Account();
        
        if (String.isNotBlank(dealerCompany))
        {
            accs = [SELECT Id,RecordTypeId,Name,Company__c, Phone FROM Account 
                    WHERE RecordTypeId = '012Do000000YFJy' AND Company__c = :dealerCompany];
        }  
        System.debug(accs);
        return accs.Id;
    }    
     //Method For To Delete a Record According to the Searchterm
       @AuraEnabled
       public static void deleteDealer(Id dealerId)
       {
           account delacc = [Select id,Name,Company__c,Phone from account where id =:dealerId];
          delete delacc;
        }  
                  
    //Method To Display All Dealer Records
    @AuraEnabled(cacheable=true)
       public static list<Account> allDealer(String field, String sortOrder)
       {
 		String query = 'SELECT Id,RecordTypeId,Name,Phone,Email__c,Company__c,BillingAddress,AM_Customer_Aadhar_Number__c,AM_Customer_Pan_Number__c FROM Account where RecordTypeId = \'012Do000000YFJy\' ';
        if (field != null && sortOrder != null) 
        {
            query += ' ORDER BY ' + field + ' ' + sortOrder;
        }
            return Database.query(query);
       } 
}