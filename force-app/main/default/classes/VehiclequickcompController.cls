public class VehiclequickcompController
{
    @AuraEnabled
    public static id insertVehicleRecord(string vehName,string vehBrand,string vehModel,string vehMake,
                                              boolean vehRepair,decimal vehPurAmt,decimal prfAmt,
                                              string vehVariant,date vehPurDate,date vehRegDate,decimal vehKms)
        
    {
        
        Product2 veh=new Product2();
        veh.RecordTypeId='012Do000000YFK2';
        veh.Name=vehName;
        veh.AM_Brand__c= vehBrand;
        veh.AM_Vehicle_Model__c=vehModel;
        veh.AM_Make_Year__c=vehMake;
        veh.AM_Repair_Required__c =vehRepair;
        veh.AM_Purchase_Amount__c=vehPurAmt;
        veh.AM_Purchase_Date__c = vehPurDate;
        veh.AM_Profit__c=prfAmt;
        veh.AM_Variant__c=vehVariant;
        veh.AM_Vehicle_Registration_Date__c=vehRegDate;
        veh.AM_Kms_Driven__c=vehKms;
        
        insert veh;
        return veh.Id;
    }   
    @AuraEnabled(cacheable=false)
    public static id gotoVehicleRepairDetail(id productId)
    {
        AM_Vehicle_Repairs__c vehRepair=[Select ID from AM_Vehicle_Repairs__c
                                         where AM_Vehicle_Number__c=:productId ];
        return vehRepair.id;
    }
      
    @AuraEnabled(cacheable=false)
    public static void insertDealerVehicleRecord(string vehName,string vehBrand,string vehModel,string vehMake,
                                             	decimal dealAmt,decimal prfAmt,string vehVariant,date vehPurDate,
                                                 date vehRegDate,decimal vehKms)
        
    {
        
        Product2 veh=new Product2();
        veh.RecordTypeId='012Do000000YFK1';
        veh.Name=vehName;
        veh.AM_Brand__c= vehBrand;
        veh.AM_Vehicle_Model__c=vehModel;
        veh.AM_Make_Year__c=vehMake;
        veh.AM_Dealer_Price__c  =dealAmt;
        veh.AM_Purchase_Date__c = vehPurDate;
        veh.AM_Profit__c=prfAmt;
        veh.AM_Variant__c=vehVariant;
        veh.AM_Vehicle_Registration_Date__c=vehRegDate;
        veh.AM_Kms_Driven__c=vehKms;
        
        insert veh;
    }   
    @AuraEnabled(cacheable=true)
    public static id searchProduct(String vehNumber) 
    {
        Product2 accs = new Product2();
        if (String.isNotBlank(vehNumber)) {
           accs= [SELECT Id, Name FROM Product2 
                    WHERE Name = :vehNumber ];
        }
        
        return accs.id;
    }
   	@AuraEnabled
    public static void deleteVehicle(id productId)
    {
        Product2 delPro = [Select id,Name from Product2 where id =:productId];
        delete delPro;
     }
	
     @AuraEnabled(cacheable=true)
    public static id updateRepaireDetails(Id productId){
        AM_Vehicle_Repairs__c vehRepair=[Select ID from AM_Vehicle_Repairs__c
                                         where AM_Vehicle_Number__c=:productId ];
        return vehRepair.id;
    }
    /*
   @AuraEnabled
   public static List<Product2> getAccountOptions() {
    
    List<Product2> prodts = [SELECT Name FROM Product2];
    
    return prodts;
   }*/
}