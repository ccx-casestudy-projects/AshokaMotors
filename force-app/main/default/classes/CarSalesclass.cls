public with sharing class CarSalesclass {
    
    @AuraEnabled (cacheable=true)
    public static List<AM_Vehicle_Sale__c> getVehicleList(){
       

        
        List<AM_Vehicle_Sale__c> vehicleList= [SELECT Id,Am_Model__c,AM_Car_Id__r.AM_Vehicle_Registration_Number__c,
        AM_Car_Id__r.AM_Profit__c,Am_Fuel_Type__c,AM_Car_Id__r.AM_Date_Of_Purchase__c, Name,AM_Car_Id__r.AM_Purchase_Amount__c,
         AM_Car_Id__r.Name,Am_Profit_Gained__c,Am_Price_Sold__c,Am_Brand__c,sold_date__c, Am_Sold_Date__c FROM AM_Vehicle_Sale__c
        ];  
             system.debug(vehicleList.size());
        return vehicleList;


    } 
     @AuraEnabled (cacheable=true)
       public static List<AM_Vehicle_Sale__c> getbydate(Integer day, Integer month, Integer year) {
       List<AM_Vehicle_Sale__c> matchedRecords=new List<AM_Vehicle_Sale__c>();
        List<AM_Vehicle_Sale__c> matchingRecords = [SELECT Am_Model__c,AM_Car_Id__r.AM_Vehicle_Registration_Number__c,AM_Car_Id__r.AM_Purchase_Amount__c,
        AM_Car_Id__r.AM_Profit__c,Am_Fuel_Type__c,AM_Car_Id__r.AM_Date_Of_Purchase__c, Name,
         AM_Car_Id__r.Name,Am_Profit_Gained__c,Am_Price_Sold__c,Am_Brand__c, Am_Sold_Date__c FROM AM_Vehicle_Sale__c];
       for(AM_Vehicle_Sale__c a:matchingRecords){
         if(a.Am_Sold_Date__c.day()==day && a.Am_Sold_Date__c.month()==month&&a.Am_Sold_Date__c.year()==year){
               System.debug(a.Am_Sold_Date__c);
              matchedRecords.add(a);
           }
       }
       
       return matchedRecords;
    }
}