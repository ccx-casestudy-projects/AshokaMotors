public class u2 
{
    public static void InsertCustomerRec(string firstname,String lastname,string email, string phone, string company,string status)

{

lead accRec=new lead();

accRec.lastname=lastname;
accRec.firstname=firstname;

accRec.email=email;
accRec.phone=phone;

accRec.company=company;

accRec.status=status;

insert accRec;

}

}