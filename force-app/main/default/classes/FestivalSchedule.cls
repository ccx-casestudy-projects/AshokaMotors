public class FestivalSchedule {
    public static integer i=1;
    public static void scheduleFestivals(){
        date dt=system.today();
        list<AM_Festival__c> fests=[select Name,AM_Festival_Name__c,
                                            AM_Date__c
                                            from AM_Festival__c 
                                            where CALENDAR_YEAR(AM_Date__c)=:dt.year()];
        
        for(AM_Festival__c fest:fests)
        {	
            integer DayOfMonth=fest.AM_Date__c.day();
            integer month=fest.AM_Date__c.month();
            integer year=fest.AM_Date__c.year();
            String etname;
            if(fest.AM_Festival_Name__c=='NewYear'){
                etname='NewYear';
            }
            else if(fest.AM_Festival_Name__c=='Pongal'){
                etname='Pongal';
            }
            else if(fest.AM_Festival_Name__c=='RepublicDay'){
                etname='RepublicDay';
            }
            else if(fest.AM_Festival_Name__c=='Holi'){
                etname='Holi';
            }
            else if(fest.AM_Festival_Name__c=='Ugadi'){
                etname='Ugadi';
            }
            else if(fest.AM_Festival_Name__c=='GoodFriday'){
                etname='GoodFriday';
            }
            else if(fest.AM_Festival_Name__c=='RamzanId/Eid-ul-Fitar'){
                etname='RamzanId/Eid-ul-Fitar';
            }
            else if(fest.AM_Festival_Name__c=='IndependenceDay'){
                etname='IndependenceDay';
            }
            else if(fest.AM_Festival_Name__c=='GaneshChaturthi	'){
                etname='GaneshChaturthi	';
            }
            else if(fest.AM_Festival_Name__c=='Dussehra'){
                etname='Dussehra';
            }
            else if(fest.AM_Festival_Name__c=='Diwali'){
                etname='Diwali';
            }
            else{
                etname='Christmas';
            }
            
            // Calculate the Cron expression dynamically based on the custom object record's date field value
            String timeExpr='0 5 13 '+DayOfMonth+' '+month+' ? '+year;
            System.schedule('newfesttest'+i, timeExpr, new ScheduleFestivalSchedular(etname));
            i++;
        }
    }
}