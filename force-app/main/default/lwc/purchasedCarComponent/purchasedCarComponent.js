import { LightningElement, wire, api, track } from 'lwc';
import getPurchasedCarDetails from '@salesforce/apex/PurchasedCarDetailsController.getPurchasedCarDetails';
import getPurchasedCarDetails1 from '@salesforce/apex/PurchasedCarDetailsController.purchasedCarDetails1';

import { getPicklistValues} from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import vehicle_obj from '@salesforce/schema/Product2';
import Status from '@salesforce/schema/Product2.AM_Vehicle_Status__c';

import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1';

const columns = [
    { label: 'Vehicle Name',sortable: "true", fieldName: 'Name' ,cellAttributes: {
      class: 'slds-theme_shade slds-text-color_error',
      style:"Font-weight:bold"}
    },
   { label: 'Vehicle Registration No', sortable: "true", fieldName: 'AM_Vehicle_Registration_Number__c' },
    { label: 'Brand', sortable: "true",fieldName: 'AM_Brand__c'},
    { label: 'Model', sortable: "true", fieldName: 'AM_Vehicle_Model__c'},
    { label: 'KMS Travelled', sortable: "true", fieldName:'KMS_Travelled__c'},
    { label: 'Color', sortable: "true", fieldName:'AM_Vehicle_Color__c' },
    { label: 'Owner Name', sortable: "true", fieldName:'AM_Owner_Name__c' },
    { label: 'Owner Phone No', sortable: "true", fieldName:'AM_Owner_Phone__c' },
    { label: 'Purchase Date', sortable: "true", fieldName:'AM_Purchase_Date__c'},
    { label: 'Purchased Amount', sortable: "true", fieldName:'AM_Purchase_Amount__c' },
    { label: 'Funded Form', sortable: "true", fieldName:'AM_Purchase_Funded_From__c' },
    { label: 'Status', sortable: "true", fieldName:'AM_Vehicle_Status__c'}
];

export default class PurchasedCarComponent extends LightningElement {

  columns = columns;
  isCssLoaded = false
  @track records;
  @api record;
  @track records1; 
  @track searchKey;
  @track searchKey1;
  @track searchKey2;
  @track searchKey3;
  @track options1=[];

  @wire(getPurchasedCarDetails)
  wiredvehicle({ error, data }) {
    if (data) {
      this.records = data;
      this.initialrecords = data;
      this.error = undefined;
    
    } else {
      this.error = error;
      this.initialrecords = undefined;
      this.records = undefined;

    }

  }
  /*Retrieving Picklist Values From Database*/
  @wire(getObjectInfo, { objectApiName: vehicle_obj })
  objectInfo;
  
  @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Status})
  typePicklistValues({error, data}) {
      if(data) {
          this.options1 = data.values;

      }    
  }
  /*Search Filter For Vehicle Status */
  handleKeyChange(event) 
  {
   this.searchkey= event.target.value;
     
   getPurchasedCarDetails1({status:this.searchkey})
    .then(result => {
     
        this.records = result;   
    })
    .catch(error => {
        this.errors = error;
      
    });
  }
  
  /*Search Filter For Vehicle Amount */
  handleKeyChange1(event)
  {
    this.searchKey1= event.target.value;
   
    getPurchasedCarDetails1({Amount:this.searchKey1})
    .then(result => 
      {    
        this.records = result;  
        alert(records);
      })
    .catch(error => 
      {
        this.errors = error;     
    });
  }

  /*Search Filter For Month of Purchase Date */
  handleKeyChange2(event)
  {
    this.searchKey2= event.target.value;
   
    getPurchasedCarDetails1({month:this.searchKey2})
    .then(result => 
      {    
        this.records = result;  
        alert(records);
      })
    .catch(error => 
      {
        this.errors = error;     
    });
  }
   /*Search Filter For Year of Purchase Date */
  handleKeyChange3(event)
  {
    this.searchKey3= event.target.value;
   
    getPurchasedCarDetails1({Year:this.searchKey3})
    .then(result => 
      {    
        this.records = result;  
        alert(records);
      })
    .catch(error => 
      {
        this.errors = error;     
    });
  }

  handleRowAction(event) {
    const action = event.detail.action;
    const row = event.detail.row;
}
doSorting(event) {
    // calling sortdata function to sort the data based on direction and selected field
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
}

renderedCallback(){ 
    if(this.isCssLoaded){
        return
    }  
    this.isCssLoaded = true

    loadStyle(this, COLORS).then(()=>{
        console.log("Loaded Successfully")
    }).catch(error=>{ 
        console.log(error)
    });
}

}