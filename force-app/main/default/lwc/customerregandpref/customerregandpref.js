import { LightningElement, track, api } from 'lwc';
import InsertCustomerRec from '@salesforce/apex/CustomerquickcompController.InsertCustomerRec';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Customerregandpref extends NavigationMixin(LightningElement) {
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
    @track isShowModal = true;
    @track customerstatus = false;
    @track excustomer = false;
    @track newcust = false;
    @api newcustid;
    @track selectedValue;
    keyIndex = 0;



    @track itemList = [
        {
            id: 0
        }
    ];
    options = [
        { label: 'Existing Customer', value: 'Existing Customer' },
        { label: 'New Customer', value: 'New Customer' }
    ];

    showModalBox() {
        this.isShowModal = true;
    }

    hideModalBox() {
        this.newcust = false;
    }
    indexupdate() {
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
    
        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) 
        {
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                element.submit();
            });
            
            this.hideModalBox();
            this.hideModalBox1();
            this.handleNavigation();
        }
        
    }
    gotoHome(){
        let compDefinition = {
            componentDef: "c:homescreen",
            attributes: 
            {
                customerid: this.newcustid
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
    
    handleNavigation() {
       
        let compDefinition = {
            componentDef: "c:disaplaycars",
            attributes: 
            {
                customerid: this.newcustid
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
    handleUserNameChange6(event) {


        this.CustomerStatus = event.target.value;

    }
    CreateRec() {



        InsertCustomerRec({ lastname: this.lastname, phone: this.phone, email: this.Email })
            .then(result => {
                this.newcustid = result;
               

                


            })
            if (this.currentStep === "1") {
                this.currentStep = "2";
            }


    }
    handleChange(event) {
        this.selectedValue = event.target.value;
        if (this.selectedValue == 'Existing Customer') {
            this.excustomer = true;
            this.newcust = false;
        }
        else if (this.selectedValue == 'New Customer'){
            
            this.excustomer = false;
          

            this.template.querySelector('[data-id="curtainModal"]').style.width = "100%";
    
        }
    }
    showModalBox1() {
        this.isShowModal1 = true;
    }
    hideModalBox1() {
        this.isShowModal1 = false;
    }
    closeModal() 
    {
        this.template.querySelector('[data-id="curtainModal"]').style.width = "0%";
        this.selectedValue = '';
       
    }
    
    handleChildAction(event) {
         this.selectedValue = event.detail;
       
      }

    handleOnStepClick(event) {
        this.currentStep = event.target.value;
    }
   
    get isStepOne() {
        return this.currentStep === "1";
    }

    get isStepTwo() {
        return this.currentStep === "2";
    }

    get isEnableNext() {
        return this.currentStep != "1";
    }
    get isEnableNext() {
        return this.currentStep != "2";
    }





}