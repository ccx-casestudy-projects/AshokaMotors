@isTest
class VehiclequickcompController_Test 
{
    
    @testSetup
    static void testInsertVehicleRecord() {
        // Create test data
        String vehName = 'Test Vehicle';
        String vehBrand = 'Tata';
        String vehModel = 'Tiago';
        String vehMake = '2000';
        Boolean vehRepair = true;
        Decimal vehPurAmt = 1000000.00;
        Date vehPurDate = Date.today();
        Decimal vehProfit = 50000.00;
        String vehVariant = 'Test Variant';
        Date vehRegDate = Date.today();
        Decimal vehKms = 5000.00;
        
        Test.startTest();
       Id prodId= VehiclequickcompController.insertVehicleRecord(vehName, vehBrand, vehModel, vehMake, vehRepair, vehPurAmt, vehProfit,
                                                       vehVariant, vehPurDate, vehRegDate, vehKms);
        Test.stopTest();
        
        List<Product2> insertedVehicles = [SELECT Id, Name, AM_Brand__c, AM_Vehicle_Model__c
                                           FROM Product2 WHERE Id = :prodId];
        
        System.assertEquals(1, insertedVehicles.size());
        Product2 insertedVehicle = insertedVehicles[0];
        
        System.assertEquals(vehName, insertedVehicle.Name);
        System.assertEquals(vehBrand, insertedVehicle.AM_Brand__c);
        System.assertEquals(vehModel, insertedVehicle.AM_Vehicle_Model__c);
    }
    
    
    @isTest
    static void testGotoVehicleRepairDetail()
    {
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
        
        Test.startTest();
        id vehId=VehiclequickcompController.gotoVehicleRepairDetail(productId);
        
        Test.stopTest();
        list<AM_Vehicle_Repairs__c> vehRepair1=[Select ID from AM_Vehicle_Repairs__c
                                         where id=:vehId ];
        Integer vehrec=vehRepair1.size();
         System.assertEquals(1, vehrec);
                       
    }
    @isTest
    static void testInsertDealerVehicleRecord()
    {
		String vehName = 'Test Vehicle2';
        String vehBrand = 'Tata';
        String vehModel = 'Tiago';
        String vehMake = '2000';
        Decimal dealAmt = 1000000.00;
        Date vehPurDate = Date.today();
        Decimal vehProfit = 50000.00;
        String vehVariant = 'VDI';
        Date vehRegDate = Date.today();
        Decimal vehKms = 5000.00;    
        
        Test.startTest();
         VehiclequickcompController.insertDealerVehicleRecord(vehName,vehBrand,vehModel,vehMake,dealAmt,vehProfit,
                                                                         vehVariant,vehPurDate,vehRegDate,vehKms);
        Test.stopTest();
        List<Product2> dealVehicles = [SELECT Id, Name, AM_Brand__c, AM_Vehicle_Model__c
                                           FROM Product2 WHERE Name = :'Test Vehicle2'];
        
        System.assertEquals(1, dealVehicles.size());
        
    }
    @isTest
    static void testSearchProduct()
    {
        Product2 prod = [SELECT Id,name FROM Product2 WHERE Name=:'Test Vehicle'];
        String vehNum=prod.Name;
 		Test.startTest();
        id vehId= VehiclequickcompController.searchProduct(vehNum);
        Test.stopTest(); 
        
        List<Product2> accs= [SELECT Id, Name FROM Product2 WHERE Id = :vehId ];
        Integer pd = accs.size();
        System.assertEquals(1, pd);
    }
    
     @isTest
    static void testUpdateRepaireDetails()
    {
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
        
        Test.startTest();
        id vehId=VehiclequickcompController.updateRepaireDetails(productId);
        
        Test.stopTest();
        list<AM_Vehicle_Repairs__c> vehRepair1=[Select ID from AM_Vehicle_Repairs__c
                                         where id=:vehId ];
        Integer vehrec=vehRepair1.size();
         System.assertEquals(1, vehrec);
    }
    
    @isTest
    static void testDeleteVehicle()
    {
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
        
        Test.startTest();
        VehiclequickcompController.deleteVehicle(productId);
        Test.stopTest(); 
        
        List<Product2> delPro = [Select id,Name from Product2 where id =:productId];
        Integer pd = delPro.size();
        System.assertEquals(0, pd);
        
    }
}