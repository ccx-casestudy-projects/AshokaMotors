public class PurchasedCarDetailsForManagerController
{
     @AuraEnabled(cacheable = true)
	public static list<Product2> purchasedCarDetails()
    {
        list<Product2> vehicle=[select Name,AM_Vehicle_Registration_Number__c,AM_Brand__c,KMS_Travelled__c,
                                AM_Date_Of_Purchase__c,AM_Purchase_Amount__c,AM_Purchase_Funded_From__c,AM_Vehicle_Color__c,
                                AM_Vehicle_Status__c,AM_Owner_Name__c,AM_Owner_Phone__c,AM_Variant__c
                                From Product2
                               ];
        system.debug(vehicle);
        return vehicle;
    }
}