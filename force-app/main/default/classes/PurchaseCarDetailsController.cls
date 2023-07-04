public class PurchaseCarDetailsController 
{
	@AuraEnabled(cacheable = true)
    //Displaying Purchased Car Details with Search Filters  
    public static List<Product2> purchasedCarDetails1(String field, String sortOrder,string status,string brand,string model,string amount)
    {
      //  Purchase Amount=IF(RecordType.Name=='AM Owner Type', AM_Purchase_Amount__c,AM_Dealer_Price__c + AM_Profit__c );
        String query = 'SELECT Id,Name, AM_Vehicle_Registration_Number__c, AM_Vehicle_Model__c, AM_Brand__c, AM_Vehicle_Color__c, '
          				  + 'KMS_Travelled__c,AM_Purchase_Amount__c,AM_Purchase_Date__c,AM_Profit__c,AM_Repair_Amount__c,AM_Fuel_Cost__c, '
           				  + 'AM_Purchase_Funded_From__c, AM_Vehicle_Status__c,AM_Dealer_Price__c,AM_Vehicle_Final_Amount__c,'		
            			  + 'AM_Owner_Name__c, AM_Owner_Phone__c FROM Product2 ';
         if(status != null) 
        {
            query += ' WHERE AM_Vehicle_Status__c LIKE \'%' + status + '%\'' ;
        }
       if(brand != null)
       {
           query += 'AND AM_Brand__c LIKE \'%' + brand + '%\'';
       }
        
        if(model != null)
       {
           query += 'AND AM_Vehicle_Model__c LIKE \'%' + model + '%\'';
       }
        
        if (amount != null) 
        {
            String[] range = amount.split('-');
            if (range.size() == 2) {
                // trim() is used to remove leading/trailing spaces
                String minAmount = range[0].trim();
                String maxAmount = range[1].trim();
               query += ' AND AM_Purchase_Amount__c >= ' + minAmount + ' AND AM_Purchase_Amount__c <= ' + maxAmount;
          
            }
        }
        
         if (field != null && sortOrder != null) {
            query += ' ORDER BY ' + field + ' ' + sortOrder;
        }
	   system.debug(query);
        return Database.query(query);
    }
   @AuraEnabled(cacheable = true)
    public static id getProductId(string productName)
    {
        Product2 prod=[Select ID from Product2
                                 where Name=:productName ];
        return prod.id;
    }
    
}