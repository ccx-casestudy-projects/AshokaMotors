@RestResource(urlMapping='/saveDocument/*')
global with sharing class CreateQuote {
    public static Id quoteid;
    public static Id quoteDocId;
    public static integer i=1;
    @HttpPost
    @AuraEnabled
    webservice static void createQuoteANDQuoteLineANDQuoteDoc(id accountid, id productid){
        
        
        //Vehicle
        Product2 product=[SELECT Id,Name,AM_Brand__c,AM_Vehicle_Model__c, AM_Vehicle_Color__c,
                          AM_Vehicle_Registration_Number__c,AM_Engine_Number__c,AM_Fuel_Type__c
                          FROM Product2
                          WHERE id=:productid];
        system.debug(product);
        //Account
        Contact acc=[SELECT Name,Id
                     FROM Contact 
                     WHERE id=:accountid];
        system.debug(acc);
        //quote creation
        SBQQ__Quote__c quote=new SBQQ__Quote__c();
        quote.SBQQ__Status__c='Negotiation';
        quote.SBQQ__PrimaryContact__c=acc.id;
        quote.SBQQ__Type__c='Quote';
        
        database.SaveResult dbs = database.insert(quote,false);
        if (dbs.isSuccess()) {
            
            System.debug('Quote Successfully inserted, Quote Id is: ' + dbs.getId());
            quoteid=dbs.getId();
        }
        
        // SBQQ__Quote__c q=[select Id,Name From SBQQ__Quote__c where id=:quoteid];
        
        //Quote line creation
        SBQQ__QuoteLine__c quoteline=new SBQQ__QuoteLine__c();
        quoteline.SBQQ__Quote__c=quoteid;
        quoteline.SBQQ__Product__c=productid;
        insert quoteline;
        system.debug('Quote Line Created Successfully'+quoteid);
        
        
        
    }
    
    
    
    
}