public class AMInvestmentHandlerClass 
{
    public static void createInvestmentProfitRecord(list<Product2> pds)
    {
        Product2 pd=new Product2();
        for(Product2 p:pds)
        {
            pd=[select id,AM_Vehicle_Final_Amount__c,RecordType.name,RecordTypeId,AM_Profit__c,AM_Purchase_Date__c 
                from Product2 
                where id=:p.id];
        }
        decimal PurchaseAmount=pd.AM_Vehicle_Final_Amount__c -pd.AM_Profit__c ;
        Integer year=pd.AM_Purchase_Date__c.year();
        Integer month=pd.AM_Purchase_Date__c.month();
        
        integer ips=[select count() from AM_Investments_Profits__c 
                     where  AM_Investment_Year__c=:year 
                     AND AM_Investment_Month__c=:month];
        
        
        list<AM_Investments_Profits__c> previp=[select AM_Investment_Month__c,AM_Opening_Stock__c,AM_Closing_Stock__c
                                                from AM_Investments_Profits__c where AM_Investment_Month__c=:month-1];
        
        AM_Investments_Profits__c ip=new AM_Investments_Profits__c();
        ip.AM_Investment_Year__c=year;
        ip.AM_Investment_Month__c=month;
        
        if(previp.size()!=0)
        {
            for(AM_Investments_Profits__c p:previp)
            {
                ip.AM_Opening_Stock__c=p.AM_Closing_Stock__c;
            }
        }
        else
        {
            for(AM_Investments_Profits__c p:previp)
            {
                ip.AM_Opening_Stock__c=0;
            }
        }
        
        if(pd.RecordType.name=='AM Owner Type')
        {
            if(ips==0)
            {
                ip.AM_Investment_Amount__c=PurchaseAmount;
                ip.AM_Closing_Stock__c=PurchaseAmount;
                ip.AM_Investment_Profits__c=0;
                insert ip;
            }
            else
            {
                AM_Investments_Profits__c ias=[select id,AM_Investment_Income__c,AM_Opening_Stock__c,AM_Closing_Stock__c,
                                               AM_Investment_Amount__c 
                                               from AM_Investments_Profits__c 
                                               where  AM_Investment_Year__c=:year 
                                               AND AM_Investment_Month__c=:month];
                
                ias.AM_Investment_Amount__c+=PurchaseAmount;
                ias.AM_Closing_Stock__c+=ias.AM_Opening_Stock__c+PurchaseAmount-0;
                update ias;
            }
        }
        else
        {
            if(ips==0)
            {
                ip.AM_Investment_Amount__c=0;
                ip.AM_Closing_Stock__c=ip.AM_Opening_Stock__c-0;
                ip.AM_Investment_Profits__c=0;
                insert ip;
            }
            else
            {
                AM_Investments_Profits__c ias=[select id,AM_Investment_Amount__c,AM_Opening_Stock__c,AM_Closing_Stock__c
                                               from AM_Investments_Profits__c 
                                               where  AM_Investment_Year__c=:year 
                                               AND AM_Investment_Month__c=:month];
                
                ias.AM_Investment_Amount__c+=0;
                ias.AM_Closing_Stock__c+=ias.AM_Opening_Stock__c-0;
                update ias;
            }
        }
    }
    public static void updateInvestmentRecord(list<AM_Vehicle_Sale__c> pds)
    {
        AM_Vehicle_Sale__c vsd=new AM_Vehicle_Sale__c();
        for(AM_Vehicle_Sale__c vs:pds)
        {
            vsd=[select id,AM_Profit_Gained__c,AM_Car_Id__c,AM_Car_Id__r.AM_Dealer_Price__c,AM_Car_Id__r.AM_Fuel_Cost__c,
                 AM_Car_Id__r.AM_Purchase_Amount__c,AM_Car_Id__r.AM_Repair_Amount__c,
                 Am_Price_Sold__c,AM_Car_Id__r.RecordType.name,Am_Sold_Date__c from 
                 AM_Vehicle_Sale__c 
                 where id=:vs.id];
        }
        Integer year=vsd.Am_Sold_Date__c.year();
        Integer month=vsd.Am_Sold_Date__c.month();
        decimal closingstock=vsd.AM_Car_Id__r.AM_Purchase_Amount__c + vsd.AM_Car_Id__r.AM_Fuel_Cost__c+vsd.AM_Car_Id__r.AM_Repair_Amount__c;
        
        integer ips=[select count() from AM_Investments_Profits__c 
                     where  AM_Investment_Year__c=:year 
                     AND AM_Investment_Month__c=:month];
        
        AM_Investments_Profits__c ip=new AM_Investments_Profits__c();
        ip.AM_Investment_Year__c=year;
        ip.AM_Investment_Month__c=month;
        
        if(vsd.AM_Car_Id__r.RecordType.name=='AM Owner Type')
        {
            if(ips==0)
            {
                ip.AM_Investment_Income__c=vsd.Am_Price_Sold__c;
                ip.AM_Closing_Stock__c=(ip.AM_Opening_Stock__c+closingstock)-vsd.Am_Price_Sold__c;
                ip.AM_Investment_Profits__c+=vsd.Am_Price_Sold__c-closingstock ;
                insert ip;
            }
            else
            {
                AM_Investments_Profits__c ias=[select id,AM_Opening_Stock__c,AM_Closing_Stock__c,AM_Investment_Income__c,AM_Investment_Profits__c
                                               from AM_Investments_Profits__c 
                                               where  AM_Investment_Year__c=:year 
                                               AND AM_Investment_Month__c=:month];
                
                ias.AM_Investment_Income__c+=vsd.Am_Price_Sold__c;
                ias.AM_Closing_Stock__c=(ias.AM_Opening_Stock__c+closingstock)- vsd.Am_Price_Sold__c ;
                ias.AM_Investment_Profits__c+=vsd.Am_Price_Sold__c-closingstock ;
                update ias;
            }
        }
        else
        {
            decimal Profit=vsd.Am_Price_Sold__c -vsd.AM_Car_Id__r.AM_Dealer_Price__c ;
            
            if(ips==0)
            {
                ip.AM_Investment_Income__c=Profit;
                ip.AM_Closing_Stock__c=ip.AM_Opening_Stock__c-Profit;
                ip.AM_Investment_Profits__c+=vsd.Am_Price_Sold__c-closingstock ;
                insert ip;
            }
            else
            {
                AM_Investments_Profits__c ias=[select id,AM_Opening_Stock__c,AM_Closing_Stock__c,AM_Investment_Income__c 
                                               from AM_Investments_Profits__c 
                                               where  AM_Investment_Year__c=:year 
                                               AND AM_Investment_Month__c=:month];
                
                ias.AM_Investment_Income__c+=Profit;
                ias.AM_Closing_Stock__c=ias.AM_Opening_Stock__c-Profit;
                ias.AM_Investment_Profits__c+=vsd.Am_Price_Sold__c-closingstock ;
                update ias;
            }
        }
    }
}