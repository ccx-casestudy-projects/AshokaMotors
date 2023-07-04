trigger AMVehicleRepairCost on AM_Vehicle_Repairs__c (after insert,after update) 
{
    if(trigger.isAfter && trigger.isInsert  || trigger.isAfter && trigger.isUpdate)
    {
       // VehclRepairHandlerClass.Updaterep(trigger.new);
    }
}