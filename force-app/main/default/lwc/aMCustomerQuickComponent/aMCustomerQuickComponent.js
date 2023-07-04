import { LightningElement,track,wire } from 'lwc';
import CustomerStatus from '@salesforce/schema/Lead.Status';
import lead_obj from '@salesforce/schema/Lead';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import InsertCustomerRec from '@salesforce/apex/CustomerquickcompController.InsertCustomerRec';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
export default class AMCustomerQuickComponent extends LightningElement {
   @track options1 = [];
   @track customer=false;
   @track isShowModal1 = false;
   @track options = [];
   @track firstname;
   @track lastname;
   @track Email;
   @track phone;
   @track Companyr;
   @track CustomerStatus;
   @track isShowModal = false;
   @track customerstatus= false;
   @track excustomer = false;
   @track newcust = false;

   options = [
       { label: 'Existing Customer', value: 'Existing Customer' },
       { label: 'New Customer', value: 'New Customer' }
   ];

   showModalBox() {  
       this.isShowModal = true;
   }

   hideModalBox() {  
       this.isShowModal = false;
   }

  @wire(getObjectInfo, { objectApiName: lead_obj })
    objectInfo;
    
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CustomerStatus})
    typePicklistValues({error, data}) {
        if(data) {
            this.options1 = data.values;
        }
       
    }
    handleUserNameChange1(event)
    {
       
      this.firstname=event.target.value;
       
   }
 
    
    handleUserNameChange2(event)
    {
       
      this.lastname=event.target.value;
      
   }

   
   handleUserNameChange3(event)
   {
    this.Email= event.target.value;
   
  }
  handleUserNameChange4(event)
   {
      
    this.phone=event.target.value;
      
  }
  handleUserNameChange5(event)
  {
     
  
    this.Companyr= event.target.value;
    
 }
 handleUserNameChange6(event)
 {
    
   
    this.CustomerStatus= event.target.value;
    
}
CreateRec() 
    {
        alert(this.firstname);
        alert(this.lastname);

        alert(this.phone);

        alert(this.Email);

        
        InsertCustomerRec({ 
            lastname:this.lastname, phone:this.phone,email:this.Email })
        .then(() => {
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Success',
                      message: 'Record Creation Successfull!!!',
                      variant: 'success'
                  })
              );
          })
          .catch(error => {
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Error',
                      message: 'Error creating Record: ' + error.body.message,
                      variant: 'error'
                  })
              );
          });
   
        }
    handleChange(event) 
    {
        this.selectedValue=event.target.value;
            if(this.selectedValue=='Existing Customer')
            {
                this.excustomer=true;
                this.newcust=false;
            }
            else             
            {
                this.newcust=true;
                this.excustomer=false;
            }
     }
     showModalBox1() {  
        this.isShowModal1 = true;
    }
    hideModalBox1() {  
        this.isShowModal1 = false;
    }
         
    }