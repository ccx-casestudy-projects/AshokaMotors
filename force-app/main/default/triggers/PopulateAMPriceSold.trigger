trigger PopulateAMPriceSold on SBQQ__Quote__c(after insert,after update)
{
	Set<Id> quoteIds = new Set<Id>();
    list<id> qlisid = new list<id>();
    list<AM_Vehicle_Sale__c> updatedvehicle = new list< AM_Vehicle_Sale__c>();
    For(SBQQ__Quote__c q:trigger.new)
    {      
            quoteIds.add(q.Id);    
    }
    List<SBQQ__Quote__c> quotelist=[select Id,SBQQ__Primary__c,SBQQ__NetAmount__c 
                                    From SBQQ__Quote__c 
                                    where Id IN : quoteIds];
    For(SBQQ__Quote__c qu:quotelist)
    {
        if(qu.SBQQ__Primary__c==true && qu.SBQQ__NetAmount__c != null)
        {  
            list<SBQQ__QuoteLine__c> qlis = [select SBQQ__Product__c,Name,SBQQ__Quote__c
                                       from SBQQ__QuoteLine__c where SBQQ__Quote__c=:qu.id ];
           for(SBQQ__QuoteLine__c qlid :qlis)
           {
               qlisid.add(qlid.SBQQ__Product__c);
           }
            for(SBQQ__QuoteLine__c qlis1:qlis)
            {
                AM_Vehicle_Sale__c vs =[select AM_Car_Id__c,Am_Price_Sold__c from AM_Vehicle_Sale__c where AM_Car_Id__c=:qlisid];
                vs.Am_Price_Sold__c=qu.SBQQ__NetAmount__c;
                updatedvehicle.add(vs);
            }
            
        }
        update updatedvehicle;
    }

    
}