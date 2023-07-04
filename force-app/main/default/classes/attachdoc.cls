public class attachdoc {
    public static void attachQuoteDoc(id quoteid){
       SBQQ__QuoteDocument__c qd=[SELECT Id, Name,SBQQ__DocumentId__c 
                                   FROM SBQQ__QuoteDocument__c 
                                   WHERE SBQQ__Quote__c=:quoteid];
        Id DocumentId=qd.SBQQ__DocumentId__c;
        system.debug(DocumentId);
        Document d=    [SELECT name,body FROM Document WHERE id=:DocumentId];
        system.debug(d);
        Attachment attachment = new Attachment(
            ParentId ='a0q5i000002fhGvAAI',
            Name = d.Name+'.pdf',
            Body = d.Body
        );
        insert attachment;
    }
}