trigger AttachDocument on SBQQ__QuoteDocument__c (after insert) {
    for (SBQQ__QuoteDocument__C qd:trigger.new)
    {
        SBQQ__Quote__c quote = [SELECT Id, SBQQ__Account__c FROM SBQQ__Quote__c WHERE Id = :qd.SBQQ__Quote__c LIMIT 1];
        if (quote != null && quote.SBQQ__Account__c != null) {
            Account acc = [SELECT Id FROM Account WHERE Id = :quote.SBQQ__Account__c LIMIT 1];
            Id DocumentId=qd.SBQQ__DocumentId__c;
            Document d= [SELECT name,body FROM Document WHERE id=:DocumentId];
            if (acc != null) {
                Attachment att = new Attachment();
                att.Name = d.Name;
                att.Body = d.body;
                att.ParentId = acc.Id;
                att.ContentType = 'application/pdf';
                insert att; 
            }
        }
    }
}