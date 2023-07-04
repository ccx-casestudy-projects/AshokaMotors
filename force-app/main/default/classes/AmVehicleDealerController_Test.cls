@istest
public class AmVehicleDealerController_Test {
    
    @testSetup 
    static void testInsertVehicleInformation() {	
        String vehName = 'Test 1';
        String vehBrand = 'Tata';
        String vehModel = 'Tiago';
        String vehFuel = 'Electric';
        String vehColor = 'None';
        String vehTrans = 'Manual';
        String vehAge = '2-4';
        String vehMake = '2000';
        Boolean vehLoan = false;
        Decimal vehDealAmt = 500000.00;
        Date vehPurDate = Date.today();
        String vehFunded = 'Home Funds';
        Decimal vehProfit = 50000.00;
        String vehVariant = 'Test Variant';
        Date vehRegDate = Date.today();
        Boolean vehRenew = false;
        String odoStatus = 'Original';
        Integer vehKms = 12000;
        String kiloWatt = '12002';
        
        Test.startTest();
        
        Id prodId = AmVehicleDealerController.insertVehicleInformation( vehName, vehBrand, vehModel, vehFuel,
                                                                       vehColor, vehTrans, vehAge, vehMake,
                                                                       vehDealAmt, vehPurDate, vehFunded,
                                                                       vehProfit, vehVariant, vehRegDate,
                                                                       odoStatus ,  vehKms, kiloWatt, vehLoan,vehRenew);
        
        System.debug(prodId);
        Test.stopTest();
        
        Product2 upVehicle = [SELECT Id, Name, AM_Brand__c, AM_Vehicle_Model__c, AM_Fuel_Type__c, AM_Dealer_Price__c,RecordTypeId
                              FROM Product2 WHERE Id=:prodId ];        
        
        System.assertEquals(vehName, upVehicle.Name);
        System.assertEquals(vehDealAmt, upVehicle.AM_Dealer_Price__c);      
    }
    
    @isTest
    static void testUpdateVehicleDetails() {
        
        Product2 testVehicle = new Product2(
            Name = 'Test Vehicle',
            RecordTypeId = '012Do000000YFK1',
            AM_Brand__c='Tata',
            IsActive=true,
            AM_Dealer_Price__c=100000.00,
            AM_Purchase_Date__c=date.today(),
            AM_Profit__c=50000.00,
            AM_Vehicle_Status__c='Available',
            AM_Vehicle_Registration_Date__c=date.today()
        );
        insert testVehicle;
        Id productId = testVehicle.Id;
        String vehBody = 'Sedan';
        String vehCapa = '4 Seater';
        String vehAcc = '9.5 seconds';
        String vehFuelTank = '50 liters';
        String vehBattType = 'Exide';
        String vehEngCapacity = '1.6L';
        String engNum = 'Engine123';
        String chsNum = 'Chassis123';
         String preOwner = '1';
         String vehOwnType = 'IT Employee';
         Boolean vehInsurance=true;
        Boolean vehRTA=false;
        Boolean vehBank=false;
        
        Test.startTest();
        AmVehicleDealerController.updateVehicleDetails(productId, vehBody, vehCapa, vehAcc, vehFuelTank, 
                                                       vehBattType, vehEngCapacity, engNum, chsNum,vehOwnType,preOwner,
                                                       vehInsurance,vehRTA,vehBank);
        Test.stopTest();
        
        Product2 updatedVehicle = [SELECT Id, AM_Body_Type__c, AM_Vehicle_Capacity__c, AM_Acceleration_Time__c,
                                   AM_Fuel_Tank_Capacity__c, AM_Battery_Type__c,
                                   AM_Engine_Capacity__c, AM_Engine_Number__c, AM_Chassis_Number__c
                                   FROM Product2 WHERE Id = :productId];
        
        System.assertEquals(vehBody, updatedVehicle.AM_Body_Type__c);
        System.assertEquals(vehCapa, updatedVehicle.AM_Vehicle_Capacity__c);
        System.assertEquals(vehAcc, updatedVehicle.AM_Acceleration_Time__c);
        System.assertEquals(vehFuelTank, updatedVehicle.AM_Fuel_Tank_Capacity__c);
        System.assertEquals(vehBattType, updatedVehicle.AM_Battery_Type__c);
        System.assertEquals(vehEngCapacity, updatedVehicle.AM_Engine_Capacity__c);
        System.assertEquals(engNum, updatedVehicle.AM_Engine_Number__c);
        System.assertEquals(chsNum, updatedVehicle.AM_Chassis_Number__c);
    }
    @isTest
    static void testUpdateDealerDetails()
    {
        Product2 testVehicle = new Product2(
            Name = 'Test Vehicle',
            RecordTypeId = '012Do000000YFK1',
            AM_Brand__c='Tata',
            IsActive=true,
            AM_Dealer_Price__c=100000.00,
            AM_Purchase_Date__c=date.today(),
            AM_Profit__c=50000.00,
            AM_Vehicle_Status__c='Available',
            AM_Vehicle_Registration_Date__c=date.today()
        );
        insert testVehicle;
        Id productId = testVehicle.Id;
       
        Account acc = new Account();
        acc.Name='Test Acc';
        insert acc;
        id accName=acc.id;
        
        Product2 car = new Product2();
        car.Id=productId;
        car.AM_Customer__c=accName;
        update car;
        
        Test.startTest();
        AmVehicleDealerController.updateDealerDetails(productId,accName);
        Test.stopTest();
        
        Product2 updatedVehicle = [SELECT Id, AM_Customer__c FROM Product2 WHERE Id = :productId];
        
        System.assertEquals(accName, updatedVehicle.AM_Customer__c);
    }
    @isTest
    static void testUploadVehicleImages()
    {
        Product2 testVehicle = new Product2(
            Name = 'Test Vehicle',
            RecordTypeId = '012Do000000YFK1',
            AM_Brand__c='Tata',
            IsActive=true,
            AM_Dealer_Price__c=100000.00,
            AM_Purchase_Date__c=date.today(),
            AM_Profit__c=50000.00,
            AM_Vehicle_Status__c='Available',
            AM_Vehicle_Registration_Date__c=date.today()
        );
        insert testVehicle;
        Id productId = testVehicle.Id;
        String vehImg1 ='https://live.staticflickr.com/4154/5223624985_2ea068b1f9_z.jpg'; 
        String vehImg2 ='https://live.staticflickr.com/4154/5223624985_2ea068b1f9_z.jpg';
        String vehImg3 ='https://live.staticflickr.com/4154/5223624985_2ea068b1f9_z.jpg';
        String vehImg4 ='https://live.staticflickr.com/4154/5223624985_2ea068b1f9_z.jpg';
        string vehmain ='https://live.staticflickr.com/4154/5223624985_2ea068b1f9_z.jpg';
        
        AM_Vehicle_Image__c veh = [select id from AM_Vehicle_Image__c where AM_Vehicle__c=:productId];
        veh.AM_Vehicle_Exterior_Image_1__c =vehImg1;
        veh.AM_Vehicle_Exterior_Image_2__c=vehImg2;
        veh.AM_Vehicle_Interior_Image_1__c=vehImg3;
        veh.AM_Vehicle_Interior_Image_2__c=vehImg4;
        veh.AM_Vehicle_Main_Image__c=vehmain;
        
        update veh;
        Test.startTest();
        AmVehicleDealerController.uploadVehicleImages(productId,vehImg1,vehImg2,vehImg3,vehImg4, 
                                                      vehmain);
        Test.stopTest();
        
        AM_Vehicle_Image__c updateVehImg = [select id,AM_Vehicle_Exterior_Image_1__c,AM_Vehicle_Exterior_Image_2__c,
                                            AM_Vehicle_Interior_Image_1__c,AM_Vehicle_Interior_Image_2__c,AM_Vehicle_Main_Image__c
                                            from AM_Vehicle_Image__c where AM_Vehicle__c=:productId];
        
        System.assertEquals(vehImg1, updateVehImg.AM_Vehicle_Exterior_Image_1__c);
        System.assertEquals(vehmain, updateVehImg.AM_Vehicle_Main_Image__c);
    }
    
    @isTest
    static void testUpdateServicingDetails()
    {
        Product2 testVehicle = new Product2(
            Name = 'Test Vehicle',
            RecordTypeId = '012Do000000YFK1',
            AM_Brand__c='Tata',
            IsActive=true,
            AM_Dealer_Price__c=100000.00,
            AM_Purchase_Date__c=date.today(),
            AM_Profit__c=50000.00,
            AM_Vehicle_Status__c='Available',
            AM_Vehicle_Registration_Date__c=date.today()
        );
        insert testVehicle;
        Id productId = testVehicle.Id;
        
        Decimal serActive = 1.0;
        Boolean serOEM = false;
        Date serLastDate = date.today();
        Date serNextDate= date.newInstance(2023, 08, 20);
       
        
        Test.startTest();
        AmVehicleDealerController.updateServicingDetails(productId,serActive,serOEM,serLastDate,serNextDate);
        Test.stopTest();
        
        Product2 updatedVehicle = [SELECT Id, AM_Active_Service_Contract_Count__c, AM_OEM_Service__c, AM_Last_Service_Date__c,
                                   AM_Next_Service_Date__c FROM Product2 WHERE Id = :productId];
        
        System.assertEquals(serActive, updatedVehicle.AM_Active_Service_Contract_Count__c);
        System.assertEquals(serOEM, updatedVehicle.AM_OEM_Service__c);
        System.assertEquals(serLastDate, updatedVehicle.AM_Last_Service_Date__c);
    }
    
    @isTest
    static void testUpdateSubWarrantyDetails()
    {
        Product2 testVehicle = new Product2(
            Name = 'Test Vehicle',
            RecordTypeId = '012Do000000YFK1',
            AM_Brand__c='Tata',
            IsActive=true,
            AM_Dealer_Price__c=100000.00,
            AM_Purchase_Date__c=date.today(),
            AM_Profit__c=50000.00,
            AM_Vehicle_Status__c='Available',
            AM_Vehicle_Registration_Date__c=date.today()
        );
        insert testVehicle;
        Id productId = testVehicle.Id;
        
        Decimal subCount = 1.0;
        Decimal subWarranty = 2.0;
        Date subStartDate = date.today();
        Date subEndDate= date.newInstance(2023, 08, 20);
        
        
        Test.startTest();
        AmVehicleDealerController.updateSubWarrantyDetails(productId,subCount,subWarranty,subStartDate,subEndDate);
        Test.stopTest();
        
        Product2 updatedVehicle = [SELECT Id, AM_Active_Subscription_Count__c, AM_Active_Warranty_Count__c, AM_Manufacturer_Warranty_Start_Date__c,
                                   AM_Manufacturer_Warranty_End_Date__c FROM Product2 WHERE Id = :productId];
        
        System.assertEquals(subCount, updatedVehicle.AM_Active_Subscription_Count__c);
        System.assertEquals(subWarranty, updatedVehicle.AM_Active_Warranty_Count__c);
        System.assertEquals(subStartDate, updatedVehicle.AM_Manufacturer_Warranty_Start_Date__c);
    }
    
    @isTest
    static void testSearchDealerAccount()
    {
        List<Account> acList= new List<Account>();
        for(Integer i=1;i<5;i++){
            Account ac = new Account();
            ac.Name = 'Test Dealer'+i;
            ac.RecordTypeId = '012Do000000YFJy';
            ac.Phone='56535423342';
            ac.Email__c='abc@gmail.com';
            ac.Company__c='ABC'+i;
            acList.add(ac); 
        }
        insert acList;
         String cmpName='ABC1';
    
        
        Test.startTest();
        List<Account> accList= AmVehicleDealerController.searchDealerAccount(cmpName);
        Test.stopTest(); 
        
        List<Account> accs= [SELECT Id, Name,Email__c,Company__c FROM Account WHERE Id = :accList ];
        Integer pd = accs.size();
        System.assertEquals(1, pd);
    }
    
    @isTest
    static void testUploadAttachment()
    {
        Product2 testVehicle = new Product2(
            Name = 'Test Vehicle',
            RecordTypeId = '012Do000000YFK1',
            AM_Brand__c='Tata',
            IsActive=true,
            AM_Dealer_Price__c=100000.00,
            AM_Purchase_Date__c=date.today(),
            AM_Profit__c=50000.00,
            AM_Vehicle_Status__c='Available',
            AM_Vehicle_Registration_Date__c=date.today()
        );
        insert testVehicle;
        Id productId = testVehicle.Id;
        
        String fileName='test';
        String fileContents='pdf';
        String contentType='pdf';
        /*
        Attachment atta = new Attachment();
        atta.ParentId = productId;
        atta.Name = fileName;
        atta.ContentType = contentType;
        atta.Body = EncodingUtil.base64Decode(fileContents);
        
        insert atta;*/
        
        Test.startTest();
        Id attchIds= AmVehicleDealerController.uploadAttachment(productId,fileName,fileContents,contentType);
        Test.stopTest();
        List<Attachment> updatedAttchment = [SELECT Id, ParentId, Name, ContentType,Body
                                             FROM Attachment WHERE ParentId = :productId];
        for(Attachment at :updatedAttchment)
        {
            System.assertEquals(fileName, at.Name);
            System.assertEquals(contentType, at.ContentType);
        }
    }
}