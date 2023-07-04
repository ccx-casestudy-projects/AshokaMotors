@isTest
private class AMVehclRepairHandlerClass_Test 
{
    @isTest
    static void TestTriggers() 
    {                
        product2 pd=new product2();
        pd.Name='AP12DQ3496';
        pd.AM_Purchase_Date__c=system.today();
        pd.AM_Vehicle_Registration_Date__c=system.today();
        pd.IsActive=true;
        pd.RecordTypeId='012Do000000YFK1';
        pd.AM_Dealer_Price__c=500000;
        pd.AM_Profit__c=20000;
        pd.AM_Minimum_Sell_Price__c=10000;
        pd.AM_Brand__c='Tata';
        pd.AM_Vehicle_Model__c='Tiago';
        pd.AM_Fuel_Type__c= 'Electric';
        pd.AM_Vehicle_Color__c= 'None';
        pd.AM_Transmission_Type__c= 'Manual';    
        pd.AM_Vehicle_Status__c='Available';   
        
        insert pd;
        
        product2 pds=new product2();
        pds.Name='AP78DQ3496';
        pds.AM_Purchase_Date__c=system.today();
        pds.AM_Vehicle_Registration_Date__c=system.today();
        pds.IsActive=true;
        pds.RecordTypeId='012Do000000YFK2';
        pds.AM_Purchase_Amount__c=600000;
        pds.AM_Fuel_Cost__c=5000;
        pds.AM_Profit__c=20000;
        pds.AM_Brand__c='Tata';
        pds.AM_Vehicle_Model__c='Tiago';
        pds.AM_Fuel_Type__c= 'Electric';
        pds.AM_Vehicle_Color__c= 'Blue';
        pds.AM_Transmission_Type__c= 'Manual';
        pds.AM_Repair_Required__c=true;
        
        insert pds;
        Product2 testpd=[select Id from Product2 where Name='AP78DQ3496'];
        
        AM_Vehicle_Repairs__c vehRep=[select id,AM_Repair_Status__c,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c 
                                      where AM_Vehicle_Number__c=:testpd.Id];
        
        AM_Vehicle_Repair_Details__c vehrepdetail=new AM_Vehicle_Repair_Details__c();
        vehrepdetail.AM_Vehicle_Repairs__c=vehRep.Id;
        vehrepdetail.AM_Repair_Detail_Status__c='Progress';
        vehrepdetail.AM_Estimated_Repair_Detail_Amount__c=5000;
        vehrepdetail.AM_Vehicle_Repair_Type__c='Mechanical';
        vehrepdetail.AM_Vehicle_Repair_Sub_Type__c='Breaks';
        insert vehrepdetail;
        
        AM_Vehicle_Repair_Details__c verpdet=[select id,AM_Vehicle_Repairs__c,AM_Actual_Repair_Detail_Amount__c,AM_Estimated_Repair_Detail_Amount__c
                                              from AM_Vehicle_Repair_Details__c where AM_Vehicle_Repairs__c=:vehRep.Id];
        
        system.assertEquals(vehRep.id, verpdet.AM_Vehicle_Repairs__c);
        
        if(verpdet.AM_Actual_Repair_Detail_Amount__c==Null && verpdet.AM_Estimated_Repair_Detail_Amount__c!=Null)
        {
            verpdet.AM_Actual_Repair_Detail_Amount__c=verpdet.AM_Estimated_Repair_Detail_Amount__c;
            update verpdet;
        }
    }
}