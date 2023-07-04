import { LightningElement ,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import InsertDealerRec from '@salesforce/apex/DealerquickCmpController.InsertDealerRec';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 

export default class DealerQuickComponent extends NavigationMixin(LightningElement) 
{
    @track firstname;
    @track lastname;
    @track company;
    @track email;
    @track phone;

    handleUserNameChange1(event)
    {
       
      this.firstname=event.target.value;       
    }

    handleUserNameChange2(event)
    {
       
      this.lastname=event.target.value;       
    }

    handleUserEmailChange3(event)
    {
     this.email= event.target.value;   
    }
    
   handleCompanyNameChange4(event)
    {
       
      this.company=event.target.value;      
    }   
   
    handleUserPhoneChange5(event)
   {      
    this.phone=event.target.value;      
   }

   CreateRec() 
    {
        InsertDealerRec({ firstname:this.firstname,lastname:this.lastname,email:this.email,company:this.company,phone:this.phone })
        .then(() => {
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Success',
                      message: 'Record Creation Successfull!!!',
                      variant: 'success'
                  })
              );
              //it is used refresh the page after record is created.
              //location.reload();
              let compDefinition = {
                componentDef: "c:homescreen",
                attributes: {
                }
            };
         
            // Base64 encode the compDefinition JS object
            let encodedCompDef = btoa(JSON.stringify(compDefinition));
            this[NavigationMixin.Navigate]({
                type: "standard__webPage",
                attributes: {
                    url: "/one/one.app#" + encodedCompDef
                }
            });
          })
          
          .catch(error => {
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Error',
                      message: 'Error creating Record: ' + error.body.message,
                      variant: 'error'
                  })
              );
          })
    }
    CallMain()
    {
        let compDefinition = {
            componentDef: "c:homescreen",
            attributes: {
            }
        };
     
        // Base64 encode the compDefinition JS object
        let encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedCompDef
            }
        });
    }
}