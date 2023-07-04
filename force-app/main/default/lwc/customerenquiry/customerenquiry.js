import { LightningElement ,track,wire,api} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getallvehciles from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails';
import getallvehciles1 from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails1';
import customerenquiry from '@salesforce/schema/AM_Customer_Enquiry__c';
import brand from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Brand__c';
import year from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Make_Year__c';
import fueltype from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Fuel_Type__c';
import kms from '@salesforce/schema/AM_Customer_Enquiry__c.KMS_Travelled__c';
import { NavigationMixin } from 'lightning/navigation';
export default class Customerenquiry extends NavigationMixin(LightningElement) {
    @api recordId;
    @track error;
    @track records;
   @api record;
    @track searchbrand='';
    @track searchyear='';
    @track searchfueltype='';
    @track searchkms='';

    @wire(getallvehciles)
    wiredvehicle({ error, data }) {
      if (data) {
        this.records = data;
        this.initialrecords = this.records;
        this.error = undefined;
      } else if (error) {
        this.error = error;
      
      }
    }

    @track options1 = [];
    @wire(getObjectInfo, { objectApiName: customerenquiry })
    objectInfo1;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo1.data.defaultRecordTypeId', fieldApiName: brand})
    typePicklistValues1({error, data}) {
        if(data) {
            this.options1 = data.values;
        }

    }
    @track options2 = [];
    @wire(getObjectInfo, { objectApiName: customerenquiry })
    objectInfo2;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo2.data.defaultRecordTypeId', fieldApiName: year})
    typePicklistValues2({error, data}) {
        if(data) {
            this.options2 = data.values;
        }

    }
    @track options3 = [];
    @wire(getObjectInfo, { objectApiName: customerenquiry })
    objectInfo3;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo3.data.defaultRecordTypeId', fieldApiName: fueltype})
    typePicklistValues3({error, data}) {
        if(data) {
            this.options3 = data.values;
        }

    }
    @track options4 = [];
    @wire(getObjectInfo, { objectApiName: customerenquiry })
    objectInfo4;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo4.data.defaultRecordTypeId', fieldApiName: kms})
    typePicklistValues4({error, data}) {
        if(data) {
            this.options4 = data.values;
        }

    }
    handlebrand(event){
        this.searchbrand = event.target.value;  
    }
handlemodel(event){
    this.searchyear = event.target.value;  
}

handlefuel(event){
    this.searchfueltype = event.target.value;  

}
handlekms(event){

    this.searchkms = event.target.value;  
}
handleRecommend(){

  getallvehciles1({makeyear: this.searchyear, kms: this.searchkms, fueltype: this.searchfueltype,  brand: this.searchbrand})
    .then(result => {
        this.record = result;
       
    })
    .catch(error => {
        this.errors = error;
      
    });









    let compDefinition = {
        componentDef: "c:customerpreference",
        attributes: {
            makeyear: this.searchyear, kms: this.searchkms, fueltype: this.searchfueltype,  brand: this.searchbrand


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