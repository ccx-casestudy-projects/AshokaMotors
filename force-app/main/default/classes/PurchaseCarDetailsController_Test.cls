@isTest
public class PurchaseCarDetailsController_Test {
    // This Method is used for testing the insertion of CustomerEnquiry Details.
    @isTest
    static void testDisplayVehicleRecords() {
        // Test data setup
        Product2 testProduct = new Product2();
        testProduct.Name = 'TS08FF6803';
        testProduct.AM_Vehicle_Model__c = 'Indigo';
        testProduct.AM_Brand__c = 'Tata';
        testProduct.AM_Vehicle_Color__c = 'Red';
        testProduct.KMS_Travelled__c = '10000';
        testProduct.AM_Purchase_Date__c = Date.today();
        testProduct.AM_Purchase_Amount__c = 500000;
        testProduct.AM_Profit__c = 1000;
        testProduct.AM_Fuel_Cost__c = 400;
        testProduct.AM_Purchase_Funded_From__c = 'ICICI';
        testProduct.AM_Vehicle_Status__c = 'Available';
        testProduct.AM_Dealer_Price__c=340000;
        testProduct.AM_Owner_Name__c = 'John Doe';
        testProduct.AM_Owner_Phone__c = '1234567890';
        
        insert testProduct;
       
        Test.startTest();

        // Call the method to test
        List<Product2> results = PurchaseCarDetailsController.purchasedCarDetails1('Name','asc','Available','Tata','Indigo','500000-800000');
        
        Test.stopTest();
        
        System.assertEquals(1, results.size());
        Product2 retrievedProduct = results[0];
        System.assertEquals('TS08FF6803', retrievedProduct.Name);
        System.assertEquals('Indigo', retrievedProduct.AM_Vehicle_Model__c);
        System.assertEquals('Tata', retrievedProduct.AM_Brand__c);
        System.assertEquals('Red', retrievedProduct.AM_Vehicle_Color__c);
        System.assertEquals('10000', retrievedProduct.KMS_Travelled__c);
        System.assertEquals(Date.today(), retrievedProduct.AM_Purchase_Date__c);
        System.assertEquals(500000, retrievedProduct.AM_Purchase_Amount__c);
        System.assertEquals(1000, retrievedProduct.AM_Profit__c);
        System.assertEquals(400, retrievedProduct.AM_Fuel_Cost__c);
        System.assertEquals('ICICI', retrievedProduct.AM_Purchase_Funded_From__c);
        System.assertEquals('Available', retrievedProduct.AM_Vehicle_Status__c);
        System.assertEquals(340000, retrievedProduct.AM_Dealer_Price__c);
        System.assertEquals('John Doe', retrievedProduct.AM_Owner_Name__c);
        System.assertEquals('1234567890', retrievedProduct.AM_Owner_Phone__c);
    }
 
    @isTest
    static void testGetProductId() {
        // Test data setup
        // Create a sample product
        Product2 product = new Product2(Name = 'TS08FF6803');
        insert product;
        
        Test.startTest();        
        // Call the method to test
        Id productId = PurchaseCarDetailsController.getProductId('TS08FF6803');
        
        Test.stopTest();
        
        // Perform assertions
        System.assertEquals(product.Id, productId);
    }
}