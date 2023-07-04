public class AMVehicleRepairCostHelper 
{
    public static void updateRepairAmountToVehicleObj(List<AM_Vehicle_Repairs__c> repList) 
    {
        List<id> idList = new List<Id>();
        for(AM_Vehicle_Repairs__c rep : repList)
        {
            idList.add(rep.id);
        }
        List<AM_Vehicle_Repairs__c> newList = [SELECT Id, AM_Repair_Total_Amount__c, AM_Vehicle_Number__r.AM_Repair_Amount__c,
                                               AM_Vehicle_Number__r.Name FROM AM_Vehicle_Repairs__c
                                               WHERE Id IN :idList];
        List<Product2> vehicleList = new List<Product2>();
        for(AM_Vehicle_Repairs__c rp :newList)
        {
            if (rp.AM_Vehicle_Number__r != null) 
            {
                Product2 veh = rp.AM_Vehicle_Number__r;
                veh.AM_Repair_Amount__c = rp.AM_Repair_Total_Amount__c;
                vehicleList.add(veh);
            }
        }
        update vehicleList;
    }
}