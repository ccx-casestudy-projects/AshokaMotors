public class u1 
{
    public static void convertLeadToAccountAndContact(Id leadId) 
    {
        Lead lead = [SELECT Id, FirstName, LastName, Company, Phone, Email FROM Lead WHERE Id = :leadId];
     
Contact newContact = new Contact();
newContact.Salutation='Mr';
newContact.FirstName = lead.FirstName;
newContact.LastName = lead.LastName;
newContact.Email = lead.Email;
       
insert newContact;

        
     
    }
    

}