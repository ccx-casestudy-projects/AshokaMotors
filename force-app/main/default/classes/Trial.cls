public class Trial 
{
	public static void getnum()
    {
        date day=system.today();
        
        list<AM_Festival__c> amf=new list<AM_Festival__c>();
        
        amf=[select AM_Festival_Name__c,AM_Years__c ,AM_Date__c from AM_Festival__c where AM_Date__c=:day];
        
        for(AM_Festival__c f:amf)
        {
            system.debug('festivall name :' +f.AM_Festival_Name__c);
        }
        
    }
}