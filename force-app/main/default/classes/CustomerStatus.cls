public class CustomerStatus 
{
    @AuraEnabled(cacheable = true)
    public static List<Lead> getAllTables()
    {
        
        List<Lead> accList =[select Name,Phone from Lead  where status!='Closed - Not Converted'];
        
        for(Lead c:accList)
        {
            system.debug(acclist);
        }
        
        return accList;
    }
     @AuraEnabled
    public static void changecustomerstatus(id recid , string stat)
    {
        Lead ld=[select Name, Status from Lead where id=:recid];
        
        ld.status=stat;
        
        update ld;
        
    }
    
    
}