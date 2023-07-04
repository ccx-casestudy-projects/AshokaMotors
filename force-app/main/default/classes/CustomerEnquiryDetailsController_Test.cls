@isTest
public class CustomerEnquiryDetailsController_Test 
{
    //This Method is used for testing the insertion of CustomerEnquiry Details.
    @isTest
    static void testDisplayCustomerRecords()
    {
        // Test data setup
        AM_Customer_Enquiry__c enquiry = new AM_Customer_Enquiry__c();
        enquiry.AM_Brand__c = 'Tata';
        enquiry.AM_Model__c = 'Nexon';
        enquiry.KMS_Travelled__c ='5001-10000'; 
        enquiry.AM_Vehicle_Color__c = 'Gray';
        enquiry.AM_Make_Year__c = '2020';
        enquiry.AM_Fuel_Type__c = 'Diesel';
        enquiry.AM_Customer_Enquiry_Status__c = 'Created';
         
        insert enquiry;
        
        Test.startTest();
        // Call the method to test
        List<SObject> results = CustomerEnquiryDetailsController.displayCustomerRecords();
        system.debug(results);
        Test.stopTest();
        
        System.assertEquals(1, results.size());
        AM_Customer_Enquiry__c retrievedEnquiry = (AM_Customer_Enquiry__c)results[0];
        System.assertEquals('Tata', retrievedEnquiry.AM_Brand__c);
        System.assertEquals('Nexon', retrievedEnquiry.AM_Model__c);
        System.assertEquals('5001-10000', retrievedEnquiry.KMS_Travelled__c);
    }
   // This Method is used for testing the deletion of CustomerEnquiry Details.
    @isTest
    static void testDeleteCustomerEnquiry()
    {
        // Test data setup
        AM_Customer_Enquiry__c enquiry = new AM_Customer_Enquiry__c();
        enquiry.AM_Brand__c = 'Tata';
        enquiry.AM_Model__c = 'Nexon';
        enquiry.KMS_Travelled__c = '5001-10000';
        enquiry.AM_Vehicle_Color__c = 'Gray';
        enquiry.AM_Make_Year__c = '2020';
        enquiry.AM_Fuel_Type__c = 'Diesel';
        enquiry.AM_Customer_Enquiry_Status__c = 'Created';

        insert enquiry;

        Test.startTest();
        // Call the method to test
        CustomerEnquiryDetailsController.deleteCustomerEnquiry(enquiry.Id);
        Test.stopTest();

        // Perform assertions
        List<AM_Customer_Enquiry__c> deletedRecords = [SELECT Id FROM AM_Customer_Enquiry__c WHERE Id = :enquiry.Id];
        System.assertEquals(0, deletedRecords.size());
    }   
}