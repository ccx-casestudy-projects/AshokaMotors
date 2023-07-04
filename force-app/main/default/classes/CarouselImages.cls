public with sharing class CarouselImages 
{
    @AuraEnabled(Cacheable=true)
    public static list<AM_Vehicle_Image__c> getImages(id vid)
    {
        list<AM_Vehicle_Image__c> img=[select Name,AM_Vehicle__r.AM_Brand__c,AM_Vehicle__r.AM_Vehicle_Model__c, 
                                       AM_Vehicle__r.AM_Make_Year__c,AM_Vehicle__r.AM_Customer_Selling_Price__c,
                                       AM_Vehicle_Main_Image__c, AM_Vehicle_Exterior_Image_1__c,AM_Vehicle_Exterior_Image_2__c ,
                                       AM_Vehicle_Interior_Image_1__c,AM_Vehicle_Interior_Image_2__c,AM_Vehicle__r.AM_Vehicle_Status__c,
                                       AM_Vehicle__r.AM_Vehicle_Owner_Type__c,AM_Vehicle__r.AM_Fuel_Type__c,AM_Vehicle__r.AM_Transmission_Type__c,
                                       AM_Vehicle__r.KMS_Travelled__c,AM_Vehicle__r.AM_Vehicle_Capacity__c
                                           from AM_Vehicle_Image__c where AM_Vehicle__c=:vid];
        return img;
    }
}