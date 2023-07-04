trigger VehclRepairHandlerTrigger on Product2 (before insert,before update,after insert, after update)
{
    if(trigger.isafter && trigger.isinsert || trigger.isafter && trigger.isupdate)
    {
        AMVehclRepairHandlerClass.insertrep(trigger.new);
    }
    if(trigger.isbefore && trigger.isinsert || trigger.isbefore && trigger.isupdate)
    {
        AMVehclRepairHandlerClass.updatevehstatus(trigger.new);
    }
     if(trigger.isafter && trigger.isinsert || trigger.isafter && trigger.isupdate)
    {
        AMVehclRepairHandlerClass.priceBookEntry(trigger.new);
    }
     /*if(trigger.isafter && trigger.isinsert)
    {
      AMInvestmentHandlerClass.createInvestmentProfitRecord(trigger.new);
    }*/
    
}