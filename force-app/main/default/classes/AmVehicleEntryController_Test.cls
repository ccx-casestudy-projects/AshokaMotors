@isTest
class AmVehicleEntryController_Test 
{
    @testSetup static void testInsertVehicleInformation() 
    {	 
        String vehName = 'Test Vehicle';
        String vehBrand = 'Tata';
        String vehModel = 'Tiago';
        String vehFuel = 'Electric';
        String vehColor = 'None';
        String vehTrans = 'Manual';
        String vehAge = '2-4';
        String vehMake = '2000';
        Boolean vehRepair = true;
       // Boolean vehActive = true;
        Boolean vehLoan = true;
        Decimal vehPurAmt = 1000000.00;
        Date vehPurDate = Date.today();
        String vehFunded = 'Home Funds';
        Decimal vehProfit = 50000.00;
       // String vehStatus = 'Available';
        String vehVariant = 'Test Variant';
        Date vehRegDate = Date.today();
        Boolean vehRenew = true;
        String odoStatus = 'Original';
        Decimal fuelPrice = 950000.00;
        Decimal vehKms = 5000.00;
        String kiloWatt = '12222';
        
        Test.startTest();
        
        id prodId = AmVehicleEntryController.insertVehicleInformation(vehName, vehBrand, vehModel, vehFuel, vehColor,
                                                                      vehTrans, vehAge, vehMake, vehRepair,vehLoan, vehPurAmt, vehPurDate, vehFunded, vehProfit,
                                                                      vehVariant, vehRegDate, vehRenew, odoStatus, fuelPrice, vehKms, kiloWatt);
        
        
        
        system.debug(prodId);
        Test.stopTest();
        
        Product2 insertedVehicle = [SELECT Id, Name, AM_Brand__c, AM_Vehicle_Model__c, AM_Fuel_Type__c
                                    FROM Product2 WHERE Id = :prodId];
        
        System.assertEquals(vehName, insertedVehicle.Name);
        System.assertEquals(vehBrand, insertedVehicle.AM_Brand__c);
        System.assertEquals(vehModel, insertedVehicle.AM_Vehicle_Model__c);
        System.assertEquals(vehFuel, insertedVehicle.AM_Fuel_Type__c);
    }
    
    @isTest
    static void testUpdateVehicleDetails() {
        
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle'];
        //system.debug(prod.Id);
        Id productId = prod.Id;
        String vehBody = 'Sedan';
        String vehCapa = '4 Seater';
        String vehFuelTank = '50 liters';
        String vehBattType = 'Amaron';
        String vehEngCapacity = '1.6L';
        String engNum = 'Engine123';
        String chsNum = 'Chassis123';
        String preOwner = '1';
        Boolean vehBank = true;
        String vehOwnType = 'IT Employee';
        Boolean vehInsurance=true;
        Boolean vehRTA=false;
        
        //update Product2 record
        Product2 car = new Product2();
        car.Id=productId;
        car.AM_Body_Type__c = vehBody;
        car.AM_Vehicle_Capacity__c = vehCapa;
        car.AM_Fuel_Tank_Capacity__c = vehFuelTank;
        car.AM_Battery_Type__c = vehBattType;
        car.AM_Engine_Capacity__c = vehEngCapacity;
        car.AM_Engine_Number__c = engNum;
        car.AM_Chassis_Number__c = chsNum;
         car.AM_NOC_From_Bank__c=vehBank;
        car.AM_No_of_Pre_Owner__c = preOwner;
         car.AM_Vehicle_Owner_Type__c = vehOwnType;
        car.AM_Insurance__c = vehInsurance;
        car.AM_NOC_From_RTA__c = vehRTA;
        update car;
        system.debug(car.Id);
        
        
        Test.startTest();
        AmVehicleEntryController.updateVehicleDetails(productId, vehBody, vehCapa, vehFuelTank, 
                                                      vehBattType, vehEngCapacity, engNum, chsNum,vehOwnType,preOwner,
                                                      vehInsurance, vehRTA,vehBank);
        Test.stopTest();
        
        Product2 updatedVehicle = [SELECT Id, AM_Body_Type__c, AM_Vehicle_Capacity__c,
                                   AM_Fuel_Tank_Capacity__c, AM_Battery_Type__c,
                                   AM_Engine_Capacity__c, AM_Engine_Number__c, AM_Chassis_Number__c
                                   FROM Product2 WHERE Id = :productId];
        
        System.assertEquals(vehBody, updatedVehicle.AM_Body_Type__c);
        System.assertEquals(vehCapa, updatedVehicle.AM_Vehicle_Capacity__c);
        System.assertEquals(vehFuelTank, updatedVehicle.AM_Fuel_Tank_Capacity__c);
        System.assertEquals(vehEngCapacity, updatedVehicle.AM_Engine_Capacity__c);
        System.assertEquals(engNum, updatedVehicle.AM_Engine_Number__c);
        System.assertEquals(chsNum, updatedVehicle.AM_Chassis_Number__c);
    }
    
    @isTest
    static void testUpdateOwnerDetails()
    {
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
        String ownerName = 'Test Owner';
        String ownerPhone = '1212121211';
        String ownerEmail = 'abc@gmail.com';
      	String owneraddress = 'xyz';
        String ownerAdhar = '1223 3344 4433';
       
        Test.startTest();
        AmVehicleEntryController.updateOwnerDetails(productId, ownerName,ownerPhone,ownerEmail, 
                                                    owneraddress,ownerAdhar);
        Test.stopTest();
        
        List<Product2> updatedVehicle = [SELECT Id,AM_Contact__c,(Select Id,Lastname,Phone from Contacts__r)
                                         FROM Product2 WHERE Id = :productId];
        
        System.assertEquals(1, updatedVehicle.size());
       
    }
    
    @isTest
    static void testUploadVehicleImages()
    {
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
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
        AmVehicleEntryController.uploadVehicleImages(productId,vehImg1,vehImg2,vehImg3,vehImg4, 
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
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
        Decimal serActive=1.0;
        Boolean serOEM=true;
        Date serLastDate=date.today();
        Date serNextDate=date.newInstance(2023, 08, 22);
        
        Product2 car = new Product2();
        car.Id=productId;
        car.AM_Active_Service_Contract_Count__c = serActive;
        car.AM_OEM_Service__c = serOEM;
        car.AM_Last_Service_Date__c = serLastDate;
        car.AM_Next_Service_Date__c = serNextDate;
        
        update car;
        
        Test.startTest();
         AmVehicleEntryController.updateServicingDetails(productId,serActive,serOEM,serLastDate,serNextDate);
        Test.stopTest();
         Product2 updatedVehicle = [SELECT Id, AM_Active_Service_Contract_Count__c, AM_OEM_Service__c, AM_Last_Service_Date__c,
                                   AM_Next_Service_Date__c
                                   FROM Product2 WHERE Id = :productId];
         
        System.assertEquals(serActive, updatedVehicle.AM_Active_Service_Contract_Count__c);
        System.assertEquals(serNextDate, updatedVehicle.AM_Next_Service_Date__c);
    }
        
    @isTest
    static void testUpdateSubWarrantyDetails()
    {
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
        Decimal subCount=1.0; 
        Decimal subWarranty=2.0;
        Date subStartDate=date.today();
        Date subEndDate=date.newInstance(2024, 05, 22);
        
        Product2 car = new Product2();
        car.Id=productId;
        car.AM_Active_Subscription_Count__c = subCount;
        car.AM_Active_Warranty_Count__c = subWarranty;
        car.AM_Manufacturer_Warranty_Start_Date__c = subStartDate;
        car.AM_Manufacturer_Warranty_End_Date__c = subEndDate;
        update car;
        
        Test.startTest();
        AmVehicleEntryController.updateSubWarrantyDetails(productId,subCount,subWarranty,subStartDate,subEndDate);
        AM_Vehicle_Repairs__c vehRepair=[Select ID from AM_Vehicle_Repairs__c
                                         where AM_Vehicle_Number__c=:productId ];
         
       // id vehRepId= vehRepair.id;
        Test.stopTest();
         Product2 updatedVehicle = [SELECT Id, AM_Active_Subscription_Count__c, AM_Active_Warranty_Count__c, AM_Manufacturer_Warranty_Start_Date__c,
                                   AM_Manufacturer_Warranty_End_Date__c,(Select id from AM_Car_Repairs__r where id=: vehRepair.id)
                                   FROM Product2 WHERE Id = :productId];
        
        AM_Vehicle_Repairs__c vehRepair1=[Select ID from AM_Vehicle_Repairs__c
                                         where id=:vehRepair.id ];
         
        System.assertEquals(subCount, updatedVehicle.AM_Active_Subscription_Count__c);
        System.assertEquals(subEndDate, updatedVehicle.AM_Manufacturer_Warranty_End_Date__c);
       // System.assertEquals(id, vehRepair1.ID);
        
    }
     @isTest
    static void testUpdateRepaireDetails()
    {
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
        
        Test.startTest();
        id vehId=AmVehicleEntryController.updateRepaireDetails(productId);
        
        Test.stopTest();
        list<AM_Vehicle_Repairs__c> vehRepair1=[Select ID from AM_Vehicle_Repairs__c
                                         where id=:vehId ];
        Integer vehrec=vehRepair1.size();
         System.assertEquals(1, vehrec);
    }
        
    @isTest
    static void testUploadAttachment()
    {
        Product2 prod = [SELECT Id FROM Product2 WHERE Name=:'Test Vehicle']; 
        Id productId = prod.Id;
        String fileName='test';
        String fileContents='pdf';
        String contentType='pdf';
        
        Attachment atta = new Attachment();
        atta.ParentId = productId;
        atta.Name = fileName;
        atta.ContentType = contentType;
        atta.Body = EncodingUtil.base64Decode(fileContents);
        
        insert atta;
        
        //Id attchId= atta.Id;
        Test.startTest();
        Id attchIds= AmVehicleEntryController.uploadAttachment(productId,fileName,fileContents,contentType);
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