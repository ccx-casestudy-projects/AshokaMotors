public with sharing class AmVehicleEntryController 
{
    /* VEHICLE INFORMATION */
    @AuraEnabled
    public static id insertVehicleInformation(String vehName,String vehBrand,String vehModel,
                                              String vehFuel,String vehColor,String vehTrans,String vehAge,
                                              String vehMake,Boolean vehRepair,
                                              Boolean vehLoan,Decimal vehPurAmt,Date vehPurDate,
                                              String vehFunded,Decimal vehProfit,
                                              string vehVariant,date vehRegDate,Boolean vehRenew,
                                              string odoStatus,Decimal fuelPrice,Decimal vehKms,string kiloWatt)
    {
        Product2 car = new Product2();
        car.Name = vehName;
        car.RecordTypeId='012Do000000YFK2';
        car.AM_Brand__c = vehBrand;
        car.AM_Vehicle_Model__c = vehModel;
        car.AM_Fuel_Type__c = vehFuel;
        car.AM_Vehicle_Color__c = vehColor;
        car.AM_Transmission_Type__c = vehTrans;
        car.AM_Vehicle_Age__c = vehAge;
        car.AM_Make_Year__c = vehMake;
        car.AM_Repair_Required__c = vehRepair;
        car.AM_Loan_Applicable__c = vehLoan;
        car.AM_Purchase_Amount__c = vehPurAmt;
        car.AM_Purchase_Date__c = vehPurDate;
        car.AM_Purchase_Funded_From__c = vehFunded;
        car.AM_Profit__c = vehProfit;
        // car.AM_Vehicle_Status__c=vehStatus;
        car.AM_Variant__c = vehVariant;
        car.AM_Vehicle_Registration_Date__c = vehRegDate;
        car.AM_Kms_Driven__c=vehKms;
        car.AM_Fuel_Cost__c = fuelPrice;
        car.AM_Vehicle_Renew__c=vehRenew;
        car.AM_Odometer_Status__c=odoStatus;
        car.AM_KiloWatt__c=kiloWatt;
        insert car;
        return car.id;
        
    }
    /* VEHICLE DETAILS */
    @AuraEnabled
    public static void updateVehicleDetails(Id productId, String vehBody,String vehCapa, 
                                            String vehFuelTank,String vehBattType,
                                            String vehEngCapacity,String engNum,String chsNum,String vehOwnType,String preOwner,
                                            Boolean vehInsurance, Boolean vehRTA,Boolean vehBank)
    {
        
        Product2 car = new Product2();
        car.Id=productId;
        car.AM_Body_Type__c = vehBody;
        car.AM_Vehicle_Capacity__c = vehCapa;
        car.AM_Fuel_Tank_Capacity__c = vehFuelTank;
        car.AM_Battery_Type__c = vehBattType;
        car.AM_Engine_Capacity__c = vehEngCapacity;
        car.AM_Engine_Number__c = engNum;
        car.AM_Chassis_Number__c = chsNum;
        car.AM_Vehicle_Owner_Type__c = vehOwnType;
        car.AM_No_of_Pre_Owner__c = preOwner;
        car.AM_Insurance__c = vehInsurance;
        car.AM_NOC_From_RTA__c = vehRTA;
        car.AM_NOC_From_Bank__c=vehBank;
        update car; 
        
    }
    /* OWNER DETAILS */
    @AuraEnabled
    public static void updateOwnerDetails(Id productId, String ownerName, String ownerPhone, String ownerEmail, 
                                          String owneraddress, String ownerAdhar)
    {
        Contact con = new Contact();
        con.AM_Vehicle__c=productId;
        con.LastName = ownerName;
        con.Phone = ownerPhone;
        con.Email = ownerEmail;
        con.Owner_Address__c = owneraddress;
        con.AM_Adhar_Number__c = ownerAdhar;
        Insert con;
        
        Product2 car = new Product2();
        car.Id=productId;
        car.AM_Contact__c=con.Id;
        update car;
        
    }
    // Vehicle Images Method
    @AuraEnabled
    public static Void uploadVehicleImages(Id productId,String vehImg1, String vehImg2, String vehImg3,
                                           String vehImg4,string vehmain)
    { 
        
        AM_Vehicle_Image__c veh = [select id from AM_Vehicle_Image__c where AM_Vehicle__c=:productId];
        veh.AM_Vehicle_Exterior_Image_1__c =vehImg1;
        veh.AM_Vehicle_Exterior_Image_2__c=vehImg2;
        veh.AM_Vehicle_Interior_Image_1__c=vehImg3;
        veh.AM_Vehicle_Interior_Image_2__c=vehImg4;
        if(vehmain!='')
        {
            veh.AM_Vehicle_Main_Image__c=vehmain;
        }     
        update veh;
    }
    /* SERVICING DETAILS */
    @AuraEnabled
    public static void updateServicingDetails(Id productId,Decimal serActive, Boolean serOEM,
                                              Date serLastDate,Date serNextDate)
    {
        Product2 car = new Product2();
        car.Id=productId;
        car.AM_Active_Service_Contract_Count__c = serActive;
        car.AM_OEM_Service__c = serOEM;
        car.AM_Last_Service_Date__c = serLastDate;
        car.AM_Next_Service_Date__c = serNextDate;
        
        update car; 
    }
    /* SUBSCRIPTION AND WARRANTY */
    @AuraEnabled
    public static id updateSubWarrantyDetails(Id productId,Decimal subCount, Decimal subWarranty,
                                              Date subStartDate,Date subEndDate)
    {
        
        Product2 car = new Product2();
        car.Id=productId;
        car.AM_Active_Subscription_Count__c = subCount;
        car.AM_Active_Warranty_Count__c = subWarranty;
        car.AM_Manufacturer_Warranty_Start_Date__c = subStartDate;
        car.AM_Manufacturer_Warranty_End_Date__c = subEndDate;
        update car;
        
        AM_Vehicle_Repairs__c vehRepair=[Select ID from AM_Vehicle_Repairs__c
                                         where AM_Vehicle_Number__c=:productId ];
        return vehRepair.id;
        
    }
    
    @AuraEnabled(cacheable=true)
    public static id updateRepaireDetails(Id productId)
    {
        AM_Vehicle_Repairs__c vehRepair=[Select ID from AM_Vehicle_Repairs__c
                                         where AM_Vehicle_Number__c=:productId ];
        return vehRepair.id;
    }
    
    @AuraEnabled
    public static Id uploadAttachment(Id productId, String fileName, String fileContents, String contentType) {
        Attachment attachment = new Attachment(
            ParentId = productId,
            Name = fileName,
            ContentType = contentType,
            Body = EncodingUtil.base64Decode(fileContents)
        );

            insert attachment;
            return attachment.Id;
         
    }
    
}