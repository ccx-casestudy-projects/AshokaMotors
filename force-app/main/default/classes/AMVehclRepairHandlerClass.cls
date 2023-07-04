public class AMVehclRepairHandlerClass 
{
    public static void insertrep(list<Product2> pds)
    {
        for(Product2 p:pds)
        {
            list<AM_Vehicle_Repairs__c> rvp=new list<AM_Vehicle_Repairs__c>();
            rvp=[select id,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c where AM_Vehicle_Number__c=:p.Id];       
            
            list<AM_Vehicle_Image__c> VIM=[select id,AM_Vehicle_Main_Image__c from AM_Vehicle_Image__c 
                                           where AM_Vehicle__c=:p.Id];
            if(VIM.size()==0)
            {
                AM_Vehicle_Image__c inImage=new AM_Vehicle_Image__c();
                inImage.AM_Vehicle__c=p.id;
                inImage.AM_Vehicle_Main_Image__c='https://static.vecteezy.com/system/resources/previews/005/576/332/original/car-icon-car-icon-car-icon-simple-sign-free-vector.jpg';
                
                insert inImage;
            }
            if(rvp.size()==0)
            {
                if(p.AM_Repair_Required__c==True)
                {
                    AM_Vehicle_Repairs__c vrp=new AM_Vehicle_Repairs__c();
                    vrp.AM_Vehicle_Number__c=p.id;
                    insert vrp;
                }
            }
        } 
    }
    public static void updatevehstatus(list<Product2> pds)
    {
        for(Product2 p:pds)
        {
            p.IsActive=true;
            
            if(p.AM_Repair_Required__c==True)
            {
                p.AM_Vehicle_Status__c='In-Repair';
            }
        }
    }
    public static void UpdateRepairDetailAmount(list<AM_Vehicle_Repair_Details__c> pds)
    {
        for(AM_Vehicle_Repair_Details__c p:pds)
        {
            if(p.AM_Estimated_Repair_Detail_Amount__c!=Null && p.AM_Actual_Repair_Detail_Amount__c==Null)
            {
                p.AM_Actual_Repair_Detail_Amount__c=p.AM_Estimated_Repair_Detail_Amount__c;
            }
        }
    }
    
    public static void Updaterep(list<AM_Vehicle_Repairs__c> pdsr)
    {
        for(AM_Vehicle_Repairs__c p:pdsr)
        {
            list<AM_Vehicle_Repairs__c> rvps=new list<AM_Vehicle_Repairs__c>();
            rvps=[select id,AM_Vehicle_Number__c from AM_Vehicle_Repairs__c where AM_Vehicle_Number__c=:p.AM_Vehicle_Number__c];
            
            if(rvps.size()==1)
            {
                if(p.AM_Repair_Status__c=='Completed')
                {
                    Product2 pd=new Product2();
                    for(AM_Vehicle_Repairs__c r:rvps)
                    {
                        pd=[select id,AM_Repair_Required__c from Product2 where id=:r.AM_Vehicle_Number__c];
                        pd.AM_Repair_Required__c=false;
                        pd.AM_Vehicle_Status__c='Available';
                        
                    }
                     update pd;
                   
                }
                if(p.AM_Repair_Total_Amount__c!=null)
                {
                    Product2 pds=new Product2();
                    for(AM_Vehicle_Repairs__c r:rvps)
                    {
                        pds=[select name,AM_Repair_Amount__c from Product2 where id=:r.AM_Vehicle_Number__c];
                    }
                    pds.AM_Repair_Amount__c=p.AM_Repair_Total_Amount__c;
                    update pds;
                }
            }
        }        
    }
    
    
    public static void priceBookEntry(list<Product2> pds)
    {
        PricebookEntry pbe=new PricebookEntry();
        
        for(Product2 p:pds)
        {
            list<PricebookEntry> pbs=new list<PricebookEntry>();
            pbs=[select id,UnitPrice from PricebookEntry where Product2Id=:p.id];
            
            if(p.AM_Vehicle_Final_Amount__c!=Null && p.IsActive==true)
            { 
                if(pbs.size()==1)
                {
                    PricebookEntry pnb =[select id,UnitPrice from PricebookEntry where Product2Id=:p.id];
                    
                    pnb.UnitPrice=p.AM_Vehicle_Final_Amount__c;                    
                    update pnb;
                }
                else 
                {
                    pbe.UnitPrice=p.AM_Vehicle_Final_Amount__c;
                    pbe.Product2Id=p.Id;
                    pbe.Pricebook2Id='01sDo000001LmeZIAS';
                    pbe.IsActive=true;
                    insert pbe;
                }
                
            }
        }
    }
    
    @AuraEnabled(Cacheable=true)
    public static list<Product2> getvehicleinfo(String field, String sortOrder, String searchTerm1 ,String searchTerm2, String searchTerm3 ,String searchTerm4)
    {   
        String query;
        query  = 'select Name,AM_Brand__c,AM_Vehicle_Model__c,AM_Vehicle_Type__c,AM_Vehicle_Registration_Number__c from Product2 ';
        if(searchTerm1 != null) 
        {
            query += ' WHERE Name LIKE \'%' + searchTerm1 + '%\'' ;
        }
        if(searchTerm2 != null) 
        {
            query += ' And AM_Brand__c LIKE \'%' + searchTerm2 + '%\'' ;
        }
        if(searchTerm3 != null) 
        {
            query += ' And AM_Vehicle_Model__c LIKE \'%' + searchTerm3 + '%\'' ;
        }
        if(searchTerm4 != null) 
        {
            query += ' And AM_Vehicle_Registration_Number__c LIKE \'%' + searchTerm4 + '%\'' ;
        }
        if(field != null && sortOrder !=null){
            query += ' ORDER BY '+field+' '+sortOrder;
        }
        return Database.query(query);
        
    }
    
    @AuraEnabled(Cacheable=true)
    public static list<Product2> getallvehicleinfo(String field, String sortOrder, String searchTerm )
    {   
        String query;
        query  = 'select Name,AM_Brand__c,AM_Vehicle_Model__c,AM_Vehicle_Registration_Number__c from Product2 ';
        if(searchTerm != null) 
        {
            query += ' WHERE Name LIKE \'%' + searchTerm + '%\' OR AM_Brand__c LIKE \'%' + searchTerm + '%\' OR AM_Vehicle_Registration_Number__c LIKE \'%' + searchTerm + '%\' OR AM_Vehicle_Model__c LIKE \'%' + searchTerm + '%\'' ;
        }
        if(field != null && sortOrder !=null){
            query += ' ORDER BY '+field+' '+sortOrder;
        }
        return Database.query(query);
        
    }
    
    @AuraEnabled
    public static void deleteSelectVehicles(id vid)
    {
        Product2 pd=[select id,Name from Product2 where id=:vid];
        delete pd;
    }
    
    @AuraEnabled(cacheable=true)
    public static list<Product2> getCarOwners(String field, String sortOrder, String searchTerm)
    {
        String query;
        query  = 'select Name,AM_Owner_Address__c,AM_Owner_Adhar_Number__c,'
            +'AM_Owner_Email__c,AM_Owner_Name__c,AM_Owner_Phone__c ,AM_Dealer_Name__c,AM_Dealer_Email__c ,' 
            +'	AM_Dealer_Phone__c,AM_Dealer_Address__c,AM_Customer__r.Company__c from Product2';
        
        String query1;
        query1  = 'select Name,RecordTypeId,RecordType.name,AM_Owner_Address__c,AM_Owner_Adhar_Number__c,'
            +'AM_Owner_Email__c,AM_Owner_Name__c,AM_Owner_Phone__c  from Product2 where RecordType.name=\'AM Owner Type\' ';
        
        String query2;
        query2  = 'select Name,RecordTypeId,RecordType.name,AM_Owner_Address__c,AM_Owner_Adhar_Number__c,'
            +'AM_Owner_Email__c,AM_Owner_Name__c,AM_Owner_Phone__c ,AM_Dealer_Name__c,AM_Dealer_Email__c ,' 
            +'	AM_Dealer_Phone__c,AM_Dealer_Address__c,AM_Customer__r.Company__c from Product2 where RecordType.name=\'AM Dealer Type\'  ';
        
        if(searchTerm == 'Dealer') 
        {
            return Database.query(query2);
        }
        else if(searchTerm == 'Owner')
        {
            return Database.query(query1);
        }
        else if(searchTerm == '')
        {
            return Database.query(query);
        }
        return Database.query(query);
    }
    
    @AuraEnabled(Cacheable=false)
    public static id uploadAddress(id AccountId,String fileName, String fileContents, String contentType,id vehicleId)
    {
        Attachment attachment = new Attachment(
            ParentId = AccountId,
            Name = fileName,
            ContentType = contentType,
            Body = EncodingUtil.base64Decode(fileContents)
        );
        insert attachment;
        
        return vehicleId; 
    }
    @AuraEnabled(Cacheable=true)
    public static list<product2> getProductPrice(id vid)
    {
        list<product2> pd=[select id,AM_Vehicle_Final_Amount__c,AM_Customer_Selling_Price__c,AM_Profit__c 
                           from Product2 where id=:vid];
        
        
        return pd;
    }
    @AuraEnabled(Cacheable=true)
    public static list<AM_Vehicle_Sale__c> SearchVehicleSales(id vid,id cid)
    {
        list<AM_Vehicle_Sale__c> veh=[select id,AM_Car_Id__c,AM_Customer__c,AM_Amount_Paid__c,AM_Balance_Amount__c 
                                      from AM_Vehicle_Sale__c 
                                          where AM_Car_Id__c=:vid and AM_Customer__c=:cid];
        
        
        return veh;
    }
    @AuraEnabled(Cacheable=true)
    public static list<decimal> calculatingSalesDiscount(id vid,decimal discount ,decimal discountperc,decimal AmountToPaid,integer Tax,string cphone)
    {
        product2 pds=[select id,AM_Vehicle_Final_Amount__c,AM_Customer_Selling_Price__c,AM_Profit__c 
                      from Product2 where id=:vid];
        
        list<AM_Vehicle_Sale__c> vshsale=[select id,AM_Customer__c,AM_Vehicle_Discount__c,AM_Balance_Amount__c,
                                          AM_Vehicle_Discount_Percent__c,AM_Car_Id__c,AM_Customer__r.Phone,
                                          AM_Amount_Paid__c,AM_Vehicle_Tax__c,
                                          AM_Car_Id__r.AM_Vehicle_Status__c from AM_Vehicle_Sale__c 
                                          where AM_Customer__r.Phone=:cphone AND AM_Car_Id__r.AM_Vehicle_Status__c='Reserved' 
                                           Order BY name DESC Limit 1];
        
        decimal balan=0;
        for(AM_Vehicle_Sale__c vs:vshsale)
        {
            balan=vs.AM_Amount_Paid__c;
        }
        List<Decimal> cal =new List<Decimal>();
        decimal PriceSold=pds.AM_Customer_Selling_Price__c ;
        
        if(discountperc!=0)
        {
            PriceSold=pds.AM_Customer_Selling_Price__c-(pds.AM_Customer_Selling_Price__c * (discountperc/100)) ;            
        }
        if(discount!=0)
        {
            PriceSold=pds.AM_Customer_Selling_Price__c-discount ;
        }
        
        decimal NetAmount=PriceSold+((PriceSold*tax)/100);
        
        decimal miniSellingPrice=pds.AM_Vehicle_Final_Amount__c;
       
        decimal balance=NetAmount-AmountToPaid-balan;
        
        cal.add(NetAmount);
        cal.add(miniSellingPrice);
        cal.add(balance);
        
        return cal;
    }
    @AuraEnabled(Cacheable=true)
    public static list<AM_Vehicle_Sale__c> GetCustomerSaleViaPhoneNum(string cphone)
    {
        list<AM_Vehicle_Sale__c> vshsale=[select id,AM_Customer__c,AM_Vehicle_Discount__c,AM_Balance_Amount__c,
                                          AM_Vehicle_Discount_Percent__c,AM_Car_Id__c,AM_Customer__r.Phone,
                                          AM_Amount_Paid__c,AM_Vehicle_Tax__c,
                                          AM_Car_Id__r.AM_Vehicle_Status__c from AM_Vehicle_Sale__c 
                                          where AM_Customer__r.Phone=:cphone AND AM_Car_Id__r.AM_Vehicle_Status__c='Reserved' Order BY name DESC Limit 1];
        
        return vshsale;
    }
    @AuraEnabled(Cacheable=true)
    public static list<id> getCustomerAndVehicleData(string cphone,string VehName)
    {
        Account Customer=[select id,Phone from Account where Phone=:cphone];
        
        Product2 Product=[select id,Name from Product2 where Name=:VehName];
        
        list<id> ids=new list<id>();
        
        ids.add(Customer.id);
        ids.add(Product.id);
        
        return ids;
    }
    @AuraEnabled
    public static void customerHasPaid(id vid,id cid,decimal pricesold,decimal discou,decimal discperc,Integer Tax,decimal amountPaid,decimal Balance)
    {
        product2 pd=[select name,AM_Vehicle_Status__c from Product2 where id=:vid];
        
        date solddate=system.today();
        
        list<AM_Customer_Enquiry__c> ce=[select name,AM_Customer_Enquiry_Status__c from AM_Customer_Enquiry__c 
                                         where AM_Customer__c=:cid Order BY name DESC Limit 1];
        
        if(Balance > 0)
        {
            pd.AM_Vehicle_Status__c='Reserved';
            update pd;
            
            for(AM_Customer_Enquiry__c c:ce)
            {
                c.AM_Customer_Enquiry_Status__c='Confirmed';
                update c;
            }
        }
        else
        {
            pd.AM_Vehicle_Status__c='Sold';
            pd.IsActive=false;
            update pd;
            
            for(AM_Customer_Enquiry__c c:ce)
            {
                c.AM_Customer_Enquiry_Status__c='Closed Won';
                update c;
            }
        }
        list<AM_Vehicle_Sale__c> existVS=[select id,AM_Amount_Paid__c,AM_Balance_Amount__c From AM_Vehicle_Sale__c where AM_Customer__c=:cid And AM_Car_Id__c=:vid 
                                          AND AM_Balance_Amount__c>0];
        
        if(existVS.size()==0)
        {
            AM_Vehicle_Sale__c vs=new AM_Vehicle_Sale__c();
            vs.AM_Customer__c=cid;
            vs.AM_Car_Id__c=vid;
            vs.AM_Vehicle_Discount__c=discou;
            vs.AM_Vehicle_Discount_Percent__c=discperc;
            vs.Am_Price_Sold__c=pricesold;
            vs.Am_Sold_Date__c=solddate;
            vs.AM_Vehicle_Tax__c=Tax;
            vs.AM_Amount_Paid__c=amountPaid;
            vs.AM_Balance_Amount__c=Balance;
            
            insert vs;
        }
        else
        {
            for(AM_Vehicle_Sale__c c:existVS)
            {
                c.AM_Amount_Paid__c+=amountPaid;
                c.AM_Balance_Amount__c=Balance;
                
                update c;
            }
        }
    }
    public class InvestmentProfitWrapper 
    {
        @AuraEnabled
        public Id investmentId {get; set;}
        @AuraEnabled
        public Decimal investmentAmount {get; set;}
        @AuraEnabled
        public Decimal investmentIncome{get; set;}
        @AuraEnabled
        public string investmentMonth{get; set;}
        @AuraEnabled
        public Decimal investmentProfit{get; set;}
        @AuraEnabled
        public decimal investmentYear{get; set;}
        @AuraEnabled
        public decimal closStock{get; set;}
        @AuraEnabled
        public decimal openStock{get; set;}
        
        public InvestmentProfitWrapper(AM_Investments_Profits__c pf) 
        {
            String[] Months = new List<String>();
            MOnths.add('Jan');
            MOnths.add('Feb');
            MOnths.add('Mar');
            MOnths.add('April');
            MOnths.add('May');
            MOnths.add('June');
            MOnths.add('July');
            MOnths.add('Aug');
            MOnths.add('Sep');
            MOnths.add('Oct');
            MOnths.add('Nov');
            MOnths.add('Dec');
            
            string Specifymonth;
            decimal Profits;
            decimal closedStock;
            
            for(Integer i=1;i<=Months.size();i++)
            {
                if(pf.AM_Investment_Month__c==i)
                {
                    Specifymonth=Months[i-1];
                }
            }
            if(pf.AM_Investment_Profits__c<0)
            {
                Profits=0;
            }
            else
            {
                Profits=pf.AM_Investment_Profits__c;
            }
            if(pf.AM_Closing_Stock__c<0)
            {
                closedStock=0;
            }
            else
            {
                closedStock=pf.AM_Closing_Stock__c;
            }
            
            this.investmentId =pf.Id;
            this.closStock=pf.AM_Closing_Stock__c;
            this.openStock=pf.AM_Opening_Stock__c;
            this.investmentAmount =pf.AM_Investment_Amount__c;
            this.investmentIncome =pf.AM_Investment_Income__c;
            this.investmentMonth =Specifymonth;
            this.investmentProfit =Profits;
            this.investmentYear =pf.AM_Investment_Year__c;            
        }
    }
    @AuraEnabled(Cacheable=true)
    public static list<InvestmentProfitWrapper> getInvestmentProfits(string searchTerm1 ,string searchTerm2)
    {
        string query;
        query='select id,AM_Investment_Amount__c,AM_Investment_Income__c,AM_Opening_Stock__c,'
            +'AM_Closing_Stock__c,AM_Investment_Month__c,AM_Investment_Profits__c,AM_Investment_Year__c from AM_Investments_Profits__c';
        
        if (searchTerm1 != '') 
        {
            query += ' WHERE AM_Investment_Month__c = ' + String.escapeSingleQuotes(searchTerm1);
        }
        if (searchTerm1 != '' && searchTerm2 != '') 
        {
            query += ' AND AM_Investment_Year__c = ' + String.escapeSingleQuotes(searchTerm2);
        }
        if (searchTerm1 == '' && searchTerm2 != '') 
        {
            query += ' Where AM_Investment_Year__c = ' + String.escapeSingleQuotes(searchTerm2);
        }
        
        list<AM_Investments_Profits__c> profits=Database.query(query);
        list<InvestmentProfitWrapper> WrapperProfits=new list<InvestmentProfitWrapper>();
        
        for(AM_Investments_Profits__c pf:profits)
        {
            WrapperProfits.add(new InvestmentProfitWrapper(pf));
        }
        return WrapperProfits;
    }
     @AuraEnabled
    public static void deleteSelectedContacts(List<Contact> contactLst) {
        delete contactLst;
    }
}