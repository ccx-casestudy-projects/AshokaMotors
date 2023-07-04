trigger AMRepairEstimateAmount_Trigger on AM_Vehicle_Repair_Details__c (before insert,before update) 
{
    if(trigger.isbefore && trigger.isinsert || trigger.isbefore && trigger.isupdate)
    {
      AMVehclRepairHandlerClass.UpdateRepairDetailAmount(trigger.new);
    }
}