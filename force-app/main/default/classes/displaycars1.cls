public with sharing class displaycars1 
{
    @AuraEnabled(cacheable = true)

    public static list<Product2> getvehicledetails()
    {
        list<Product2> imagess=[select Id,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
        AM_Make_Year__c,AM_Vehicle_Model__c,AM_Brand__c,AM_Target_Price__c 
        from Product2];
        return imagess;
    }
    
}