import { LightningElement ,track,api} from 'lwc';
import getPhoneNum from '@salesforce/apex/AmCustomerDetailController.getPhoneNum';
import createCST from '@salesforce/apex/AmCustomerDetailController.createCST';
import { NavigationMixin } from 'lightning/navigation';




import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Alreadyvisitedcustomer extends NavigationMixin(LightningElement) {

   
         @track isShowModal2=true ;
   

     
    @track input;
    @track isFormVisible = false;
    //@track butval;
    @track showpage=false;
    @track data;
    @api records;
    @track selectedValue;
    @track dataid;
    @track currentStep = '1';
    @track options1 = [];
    @track customer = false;
    @track isShowModal1 = false;
    @track options = [];
    @track firstname;
    @track lastname;
    @track Email;
    @track phone;
    @track Companyr;
    @track CustomerStatus;
    @track isShowModal = false;
    @track customerstatus = false;
    @track excustomer = false;
    @track newcust = false;
    @api newcustid;
    keyIndex = 0;
    @track itemList = [
        {
            id: 0
        }
    ];
    /////////////////////////////////////////////////////////////////////////////////
    handleChange(event)
    {
        this.input=event.target.value;
    }
   
    handleShowModal(event)
    {
        this.isShowModal2 = false;
         getPhoneNum({ph:this.input})

        .then(result => {
            this.data=result;
            
           
            this.records=this.data;
            
            this.record = this.records[0].Id; 
            
           
        this.dataid = this.record;
       
        
        this.isFormVisible = true;

        this.template.querySelector('[data-id="curtainModal"]').style.width = "100%";

        })
        .catch(error => {
           
            const toastEvent = new ShowToastEvent({
                title: 'Error!',
                message: 'Invalid Phone number. Please enter a valid Phone number.',
                variant: 'error'
            });
            this.dispatchEvent(toastEvent);
        });

      
    
    }
    @api closeModal(event) 
    {
        this.template.querySelector('[data-id="curtainModal"]').style.width = "0%";
        
        const selectedOption = '';
        const actionEvent = new CustomEvent('action', {
          detail: selectedOption
        });
        this.dispatchEvent(actionEvent);
    }
  
    @api hideModalBox2() {  
        this.isShowModal2 = false;
        const selectedOption = '';
        const actionEvent = new CustomEvent('action', {
          detail: selectedOption
        });
        this.dispatchEvent(actionEvent);
    }
    
    handlekick()
    {
        createCST({cid:this.dataid})

        .then(() => {
            const toastEvent = new ShowToastEvent({
                title: 'Success!',
                message: 'Record updated successfully.',
                variant: 'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error => {
            const toastEvent = new ShowToastEvent({
                title: 'Error!',
                message: error.body.message,
                variant: 'error'
            });
            this.dispatchEvent(toastEvent);
        });

        //changing the progress step
        
    }



    ////////////////////////////

    indexupdate() 
    {
        this.index++;
    }
    addRow() {
        ++this.keyIndex;
        var newItem = [{ id: this.keyIndex }];
        this.itemList = this.itemList.concat(newItem);

    }

    removeRow(event) {
        if (this.itemList.length >= 2) {
            this.itemList = this.itemList.filter(function (element) {
                return parseInt(element.id) !==
                    parseInt(event.target.accessKey);
            });
        }
    }
    handlebrand(event) {
        this.searchbrand = event.target.value;
    }
    handlemodelyear(event) {
        this.searchmakeyear = event.target.value;
    }
    handlecolor(event) {
        this.searchcolor = event.target.value;
    }
    handlefuel(event) {
        this.searchfueltype = event.target.value;
    }
    handletransmission(event) {
        this.searchtransmissiontype = event.target.value;
    }

    handleSubmit() {

        createCST({cid:this.dataid})

 
        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) 
        {
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                element.submit();
            });
            
        
            this.handleNavigation();
        }
        
    }
    
    handleNavigation() {
        
        let compDefinition = {
            componentDef: "c:disaplaycars",
            attributes: 
            {
                customerid: this.dataid
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
    
   
   
    
    
    


    /*@wire(getObjectInfo, { objectApiName: lead_obj })
      objectInfo;
      
      @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CustomerStatus})
      typePicklistValues({error, data}) {
          if(data) {
              this.options1 = data.values;
          }
          }
         */

    handleUserNameChange1(event) {

        this.firstname = event.target.value;

    }


    handleUserNameChange2(event) {

        this.lastname = event.target.value;

    }


    handleUserNameChange3(event) {
        this.Email = event.target.value;

    }
    handleUserNameChange4(event) {

        this.phone = event.target.value;

    }
    handleUserNameChange5(event) {


        this.Companyr = event.target.value;

    }
    handleUserNameChange6(event) 
    {


        this.CustomerStatus = event.target.value;

    }
    handleOnStepClick(event) 
    {
        this.currentStep = event.target.value;
    }
   
    get isStepOne() {
        return this.currentStep === "1";
    }

    get isStepTwo() {
        return this.currentStep === "2";
    }
}