public with sharing class SearchFilterForStringBasedonAMVehicle 
{
     @AuraEnabled(cacheable=true)
    public static list<Product2> readLeadDetails(String searchbran,String searchmod) 
    {
           // searchbran = '%' + searchbran + '%';
           // searchmod = '%' + searchmod + '%';
       list<Product2> lds=[SELECT AM_Vehicle_Model__c,AM_Brand__c 
                       FROM Product2 
                       where AM_Vehicle_Model__c=:searchbran AND AM_Brand__c=:searchmod];
        for(Product2 l:lds){
            system.debug(l);
        }
        
        return lds;
    }
	
}