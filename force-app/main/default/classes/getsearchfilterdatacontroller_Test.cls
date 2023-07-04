@isTest
private class getsearchfilterdatacontroller_Test 
{
    @isTest
    static void testGetVehicleDetails()
    {
        // Test data
        product2 pd=new product2();
        pd.Name='AP12DQ3496';
        pd.AM_Vehicle_Registration_Date__c=system.today();
        pd.IsActive=true;
        pd.RecordTypeId='012Do000000YFK1';
        pd.AM_Brand__c='Tata';
        pd.AM_Vehicle_Model__c='Tiago';
        pd.AM_Fuel_Type__c= 'Electric';
        pd.AM_Vehicle_Color__c= 'None';
        pd.AM_Transmission_Type__c= 'Manual';    
        pd.AM_Vehicle_Status__c='Available';  
        pd.AM_Variant__c='2000';
		pd.KMS_Travelled__c='45000';        
        insert pd;
        
        product2 pds=new product2();
        pds.Name='AP78DQ3496';
        pds.AM_Vehicle_Registration_Date__c=system.today();
        pds.IsActive=true;
        pds.RecordTypeId='012Do000000YFK2';
        pds.AM_Brand__c='Tata';
        pds.AM_Vehicle_Model__c='Tiago';
        pds.AM_Fuel_Type__c= 'Electric';
        pds.AM_Vehicle_Color__c= 'Blue';
        pds.AM_Transmission_Type__c= 'Manual';
        pds.AM_Vehicle_Status__c='In-Repair';   
        pds.AM_Variant__c='2000'; 
        pds.KMS_Travelled__c='6000';
        insert pds;
        // Call the method to test
        Test.startTest();
        list<Product2> results =getsearchfilterdatacontroller.getvehicledetails();
        Test.stopTest();  
        //Assertions
        System.assertEquals(2, results.size());        
    }
    @isTest
    static void testGetVehicleDetails1() 
    {
        // Create test data
             product2 p=new product2();
                p.Name='AP12DQ3476';
                p.AM_Vehicle_Registration_Date__c=system.today();
                p.IsActive=true;
                p.RecordTypeId='012Do000000YFK1';
                p.AM_Brand__c='Tata';
                p.AM_Vehicle_Model__c='Tiago';
                p.AM_Fuel_Type__c= 'Electric';
                p.AM_Vehicle_Color__c= 'Red';
                p.AM_Transmission_Type__c= 'Manual';    
                p.AM_Vehicle_Status__c='Available';  
                p.AM_Variant__c='2000';
                p.KMS_Travelled__c='45000';  
                p.AM_Make_Year__c='2021';
        		p.AM_Body_Type__c='SUV';
                insert p;

            product2 pd=new product2();
                pd.Name='AP12DQ3496';
                pd.AM_Vehicle_Registration_Date__c=system.today();
                pd.IsActive=true;
                pd.RecordTypeId='012Do000000YFK1';
                pd.AM_Brand__c='Tata';
                pd.AM_Vehicle_Model__c='Tiago';
                pd.AM_Fuel_Type__c= 'Petrol';
                pd.AM_Vehicle_Color__c= 'Red';
                pd.AM_Transmission_Type__c= 'Manual';    
                pd.AM_Vehicle_Status__c='Available';  
                pd.AM_Variant__c='2000';
                pd.KMS_Travelled__c='45000';  
                pd.AM_Make_Year__c='2020';
        		pd.AM_Body_Type__c='Sedan';
                insert pd;
       

        // Call the method to test
        Test.startTest();
        List<Product2> result = GetSearchFilterDataController.getvehicledetails1( '2020', 'Petrol', 'Sedan', 'Manual','Tata','Red', '40000-60000');
        Test.stopTest();
        // Assertions
        System.assertEquals(1, result.size());
      }
    
    @isTest
    static void testGetPreferedVehciles()
    {
          // Create test data
        Account testAccount = new Account(
            Name = 'Test Account',
            Phone= '9765434567'
        );
        insert testAccount;

        AM_Customer_Enquiry__c enquiry = new AM_Customer_Enquiry__c(
            AM_Brand__c = 'Tata',
            AM_Make_Year__c = '2021',
            AM_Vehicle_Color__c = 'Red',
            AM_Model__c = 'Tiago',
            AM_Fuel_Type__c = 'Petrol',
            AM_Customer__c = testAccount.Id
        );
        insert enquiry;

        List<Product2> products = new List<Product2>();
            Product2 p = new Product2();
			    p.Name='AP12DQ3476';
                p.AM_Vehicle_Registration_Date__c=system.today();
                p.IsActive=true;
                p.RecordTypeId='012Do000000YFK1';
                p.AM_Brand__c='Tata';
                p.AM_Vehicle_Model__c='Tiago';
                p.AM_Fuel_Type__c= 'Petrol';
                p.AM_Vehicle_Color__c= 'Red';
                p.AM_Transmission_Type__c= 'Manual';    
                p.AM_Vehicle_Status__c='Available';  
                p.AM_Variant__c='2000';
                p.KMS_Travelled__c='45000';  
                p.AM_Make_Year__c='2021';
        		p.AM_Body_Type__c='SUV';
                insert p;

        // Call the method to test
        Test.startTest();
        List<Product2> result = GetSearchFilterDataController.getPreferedVehciles(testAccount.Id);
        Test.stopTest();

        // Assertions
        System.assertEquals(1, result.size());
    }
       
    @isTest
    static void testSearchCustomer()
    {
        // Create test data
        Account testAccount = new Account(
            Name = 'Test Account',
            Phone = '1234567890'		
        );
        insert testAccount;

        // Call the method to test
        Test.startTest();
        Id result = GetSearchFilterDataController.searchCustomer('1234567890');
        Test.stopTest();

        // Assertions
        System.assertEquals(testAccount.Id, result);
    }
    @isTest
    static void testDeleteCustomer()
    {
        // Create test data
        Account testAccount = new Account(
            Name = 'Test Account',
            Phone = '1234567890'
        );
        insert testAccount;

        // Call the method to test
        Test.startTest();
        GetSearchFilterDataController.deleteCustomer(testAccount.Id);
        Test.stopTest();

        // Assertions
        List<Account> accounts = [SELECT Id FROM Account WHERE Id = :testAccount.Id];
        System.assertEquals(0, accounts.size());
    }
}