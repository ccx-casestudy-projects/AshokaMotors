public class CustomerEnquiry
{
    @AuraEnabled(cacheable = true)
    public static List<AM_Customer_Enquiry__c> getAllTable(){
       
        List<AM_Customer_Enquiry__c> accList =[select Name,AM_Brand__c,AM_Customer_Enquiry_Status__c,AM_Vehicle_Capacity__c,AM_Budget_Range__c
                                               ,AM_Customer__r.Name,AM_Customer__r.Phone,AM_Customer__r.Status,AM_Customer__r.id from  AM_Customer_Enquiry__c  ];
        
        for(AM_Customer_Enquiry__c a:accList){system.debug(a.AM_Customer__r.id);}
        return accList;
    }

}