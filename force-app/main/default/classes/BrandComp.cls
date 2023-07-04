public class BrandComp {
  @AuraEnabled(cacheable = true)
        public static list<Product2> getvehicledetails(){
                list<Product2> imagess=[select id,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
            AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Brand__c,AM_Transmission_Type__c
            from Product2 ];
            return imagess;
        }
        @AuraEnabled(cacheable = true)
     public static list<Product2> getvehicledetails1(string brand){
               brand =  '%'+ brand +'%';
                list<Product2> brandss=[select id,AM_Brand__c,
                AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Transmission_Type__c
                from Product2 where   AM_Brand__c LIKE : brand];
            system.debug(brandss);
               
                    return brandss;
}

}