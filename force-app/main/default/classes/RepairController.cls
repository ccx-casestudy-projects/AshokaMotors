public with sharing class RepairController
{
    @AuraEnabled
    public static list<AM_Vehicle_Repair_Details__c> SaveRepairs(list<AM_Vehicle_Repair_Details__c> RepairList)
    {
        try 
        {
            insert RepairList;
            return RepairList;
        } 
        catch (Exception ex) 
        {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}