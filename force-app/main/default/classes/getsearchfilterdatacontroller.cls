public with sharing class getsearchfilterdatacontroller 
{
    @AuraEnabled
public static account getdata(Id accid)
{
    Account a=[select Name,Email__c,Phone from account where id=:accid];
    return a;
}
    @AuraEnabled(cacheable = true)
    public static list<Product2> getvehicledetails()
    {
        list<Product2> imagess=[select id,AM_Vehicle_Final_Amount__c,AM_Variant__c,AM_Brand__c,AM_Vehicle_Model__c,
                                (select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
                                AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Transmission_Type__c
                                from Product2 ];
        return imagess;
    }//,string kms
    @AuraEnabled(cacheable = true)
    
    public static List<Product2> getvehicledetails1(string makeyear, string fueltype, string bodytype, string transmission, string brand, string color, string kms)
    {
        String query = 'SELECT id, AM_Vehicle_Final_Amount__c, AM_Variant__c, AM_Brand__c, AM_Vehicle_Model__c, ' +
            '(SELECT id, AM_Main_Image__c, AM_Vehicle_Main_Image__c FROM AM_Vehicle_Images__r), ' +
            'AM_Make_Year__c, KMS_Travelled__c, AM_Fuel_Type__c, AM_Body_Type__c, ' +
            'AM_Transmission_Type__c, AM_Vehicle_Color__c ' +
            'FROM Product2';
        
        List<String> conditions = new List<String>();
        
        if (String.isNotBlank(makeyear))
        {
            conditions.add('AM_Make_Year__c = \'' + makeyear + '\'');
        }
        
        if (String.isNotBlank(fueltype))
        {
            conditions.add('AM_Fuel_Type__c = \'' + fueltype + '\'');
        }
        
        if (String.isNotBlank(bodytype))
        {
            conditions.add('AM_Body_Type__c = \'' + bodytype + '\'');
        }
        
        if (String.isNotBlank(transmission))
        {
            conditions.add('AM_Transmission_Type__c = \'' + transmission + '\'');
        }
        
        if (String.isNotBlank(brand))
        {
            conditions.add('AM_Brand__c = \'' + brand + '\'');
        }
        
        if (String.isNotBlank(color))
        {
            conditions.add('AM_Vehicle_Color__c = \'' + color + '\'');
        }
        
        if (String.isNotBlank(kms))
        {
            String[] range = kms.split('-');
            String minAmount = range[0].trim();
            String maxAmount = range[1].trim();
            conditions.add('KMS_Travelled__c >= \'' + minAmount + '\' AND KMS_Travelled__c <= \'' + maxAmount + '\'');
        }
        
        
        // Construct the final query string
        if (conditions.size() > 0)
        {
            query += ' WHERE ' + String.join(conditions, ' AND ');
        }
        
        // Execute the query
        List<Product2> products = Database.query(query);
        
        return products;
    }
    
    @AuraEnabled(cacheable = true)
    public static List<Product2> getpreferedvehciles(Id custid) {
        
        List<Product2> products = new List<Product2>();
        Set<Id> prefedredcarids=new Set<Id>();
        List<AM_Customer_Enquiry__c> customerenquiries = [
            SELECT id, AM_Brand__c, AM_Make_Year__c, AM_Vehicle_Color__c,AM_Model__c,AM_Fuel_Type__c
            FROM AM_Customer_Enquiry__c 
            where AM_Customer__c=:custid
        ];
        system.debug('customerenquiries '+customerenquiries);
        
        for (AM_Customer_Enquiry__c ce : customerenquiries) {
            
            
            String query = 'SELECT id,AM_Vehicle_Final_Amount__c,AM_Variant__c, AM_Brand__c, AM_Vehicle_Model__c, ' +
                '(SELECT id, AM_Main_Image__c, AM_Vehicle_Main_Image__c FROM AM_Vehicle_Images__r), ' +
                'AM_Make_Year__c,KMS_Travelled__c, AM_Fuel_Type__c, AM_Body_Type__c, ' +
                'AM_Transmission_Type__c, AM_Vehicle_Color__c ' +
                'FROM Product2 WHERE ';
            
            List<String> conditions = new List<String>();
            
            if (String.isNotBlank(ce.AM_Brand__c )) {
                conditions.add('AM_Brand__c = \'' + ce.AM_Brand__c + '\'');
            }
            
            if (String.isNotBlank(ce.AM_Make_Year__c )) {
                conditions.add('AM_Make_Year__c = \'' + ce.AM_Make_Year__c + '\'');
            }
            
            if (String.isNotBlank(ce.AM_Vehicle_Color__c)) {
                conditions.add('AM_Vehicle_Color__c = \'' + ce.AM_Vehicle_Color__c + '\'');
            }
            if (String.isNotBlank(ce.AM_Model__c)) {
                conditions.add('AM_Vehicle_Model__c = \'' + ce.AM_Model__c + '\'');
            }
            if (String.isNotBlank(ce.AM_Fuel_Type__c)) {
                conditions.add('AM_Fuel_Type__c = \'' + ce.AM_Fuel_Type__c + '\'');
            }
            
            query += String.join(conditions, ' AND ');
            
            system.debug(query +'  query');
            products = Database.query(query);
            
             system.debug(products +'  products');
            
            
            for (Product2 prod : products) {
                prefedredcarids.add(prod.Id);
                
            }
            system.debug(prefedredcarids +' prefedredcarids');
        }
        List<Product2> carbrands=[select id,AM_Vehicle_Final_Amount__c,AM_Variant__c,AM_Brand__c,AM_Vehicle_Model__c,(select id,AM_Main_Image__c,AM_Vehicle_Main_Image__c from AM_Vehicle_Images__r),
                                  AM_Make_Year__c,KMS_Travelled__c,AM_Fuel_Type__c,AM_Body_Type__c,AM_Transmission_Type__c
                                  from Product2 WHERE Id in:prefedredcarids  ];
        system.debug(carbrands);
        return carbrands;
    }
    
    
    @AuraEnabled(cacheable=true)
    public static id searchcustomer(String phnoNumber) 
    {
        Account accs = new Account();
        if (String.isNotBlank(phnoNumber)) {
            accs= [SELECT Id, Name FROM Account 
                   WHERE Phone = :phnoNumber ];
        }
        
        return accs.id;
    }
    @AuraEnabled
    public static void deletecustomer(id customerid)
    {
        Account delcustomer = [Select id,Name from Account where id =:customerid];
        delete delcustomer;
    }
    
}