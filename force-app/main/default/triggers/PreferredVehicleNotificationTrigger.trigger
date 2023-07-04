trigger PreferredVehicleNotificationTrigger on Product2 (after insert,after update) 
{
    if(trigger.isupdate && trigger.isafter)
    {
         PreferredVehNotificationController.sendEmailsForAvailableVehicles(trigger.new); 
    }
}