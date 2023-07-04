@isTest
public class DealerquickCmpController_Test
{
    @isTest
    static void testInsertDealerRec() 
    {
        // Create test data
        String firstname = 'John';
        String lastname = 'Doe';
        String email = 'john.doe@example.com';
        String company = 'Cello';
        String phone = '1234567890';
        
        Test.startTest();
        
        // Call the method to test
        Id accountId = DealerquickCmpController.InsertDealerRec(firstname, lastname, email, company, phone);
        
        Test.stopTest();
        
        // Verify the insertion
        Account insertedAccount = [SELECT Id, Name, Company__c, Email__c, Phone FROM Account WHERE Id = :accountId];
        System.assertEquals(lastname, insertedAccount.Name, 'Last Name should match');
        System.assertEquals(company, insertedAccount.Company__c, 'Company should match');
        System.assertEquals(email, insertedAccount.Email__c, 'Email should match');
        System.assertEquals(phone, insertedAccount.Phone, 'Phone should match');
    }
    
	 @IsTest
    static void testSearchDealer()
    {
        // Create test data
        Account account1 = new Account(
            Name = 'Dealer 1',
            Company__c = 'Company 1',
            Phone = '1234567890'
        );
        insert account1;
        
        Account account2 = new Account(
            Name = 'Dealer 2',
            Company__c = 'Company 2',
            Phone = '9876543210'
        );
        insert account2;
        
        Test.startTest();
        
        // Call the method to test with both dealerCompany and dealerNum
        Id result1 = DealerquickCmpController.searchDealer('Company 1', '1234567890');
        System.assertEquals(account1.Id, result1, 'Search result should match account1 Id');
        
        // Call the method to test with only dealerNum
        Id result2 = DealerquickCmpController.searchDealer(null, '9876543210');
        System.assertEquals(account2.Id, result2, 'Search result should match account2 Id');
        
        // Call the method to test with only dealerCompany
        Id result3 = DealerquickCmpController.searchDealer('Company 2', null);
        System.assertEquals(account2.Id, result3, 'Search result should match account2 Id');
        
        Test.stopTest();
    }
    
    @IsTest
    static void testDeleteDealer() 
    {
        // Create test data
        Account account = new Account(
            Name = 'Test Dealer',
            Phone = '1234567890'
        );
        insert account;
        
        Test.startTest();
        
        // Call the method to test
        DealerquickCmpController.deleteDealer(account.Id);
        
        Test.stopTest();
        
        // Verify the deletion
        List<Account> deletedAccounts = [SELECT Id FROM Account WHERE Id = :account.Id];
        System.assertEquals(0, deletedAccounts.size(), 'Account should have been deleted');
    }
    
     @IsTest
    static void testAllDealer()
    {
        // Create test data
        Account account1 = new Account(
            Name = 'Dealer 1',
            RecordTypeId = '012Do000000YFJy',
            Phone = '1234567890',
            Email__c = 'test1@example.com',
            Company__c = 'Test Company 1'
        );
        insert account1;
        
        Account account2 = new Account(
            Name = 'Dealer 2',
            RecordTypeId = '012Do000000YFJy',
            Phone = '9876543210',
            Email__c = 'test2@example.com',
            Company__c = 'Test Company 2'
        );
        insert account2;
        
        Test.startTest();
        
        // Call the method to test without sorting
        List<Account> result1 = DealerquickCmpController.allDealer(null, null);
        System.assertEquals(2, result1.size(), 'Query result should have two records');
        System.assertEquals(account1.Id, result1[0].Id, 'Account1 Id should match');
        System.assertEquals(account2.Id, result1[1].Id, 'Account2 Id should match');
        
        // Call the method to test with sorting
        List<Account> result2 = DealerquickCmpController.allDealer('Name', 'DESC');
        System.assertEquals(2, result2.size(), 'Query result should have two records');
        System.assertEquals(account2.Id, result2[0].Id, 'Account2 Id should match');
        System.assertEquals(account1.Id, result2[1].Id, 'Account1 Id should match');
        
        Test.stopTest();
    }
    
}