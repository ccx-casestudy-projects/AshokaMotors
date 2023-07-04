import { LightningElement,api,track,wire } from 'lwc';

import getCustomerdetails from '@salesforce/apex/CustomerEnquiryDetailsController.displayCustomerRecords';
//import { deleteRecord } from 'lightning/uiRecordApi';
import deleteCustomerEnquiry from '@salesforce/apex/CustomerEnquiryDetailsController.deleteCustomerEnquiry';

import NAME_FIELD from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Customer_Name__c';
import Brand_FIELD from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Brand__c';
import Model_FIELD from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Model__c';
import KMS_FIELD from '@salesforce/schema/AM_Customer_Enquiry__c.KMS_Travelled__c';
import Fuel_FIELD from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Fuel_Type__c';
import Color_FIELD from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Vehicle_Color__c';
import Make_FIELD from '@salesforce/schema/AM_Customer_Enquiry__c.AM_Make_Year__c';

import {loadStyle} from 'lightning/platformResourceLoader';

import { NavigationMixin } from 'lightning/navigation';

import COLORS from '@salesforce/resourceUrl/PurchasedVehiceStyles';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Vehicle No', fieldName:'VehicleNo',type:'text' },
    { label: 'Customer Name', fieldName: 'AM_Customer_Name__c'},  
    { label: 'Brand', sortable: "true",fieldName: 'AM_Brand__c'},
    { label: 'Model', sortable: "true",fieldName: 'AM_Model__c'},
    { label: 'kms Travelled', fieldName: 'KMS_Travelled__c'},
    { label: 'Color', fieldName:'AM_Vehicle_Color__c' },
    { label: 'MakeYear', fieldName: 'AM_Make_Year__c'},
    { label: 'Fuel Type', fieldName: 'AM_Fuel_Type__c' },
    { label: 'Status', fieldName: 'AM_Customer_Enquiry_Status__c'},
    { label: 'Enquiry Date', fieldName: 'CreatedDate',type: 'date',
    typeAttributes: {
     year: '2-digit',
     month: '2-digit',
     day: '2-digit'
   }},
    { label: 'Edit', type: 'button',
    
       typeAttributes: { 
        label: 'Edit', 
        name: 'edit',
        iconName: 'utility:edit',
        variant: 'brand',  
            },cellAttributes: { } 
    }
];
    
export default class CustomerDetailsComp extends NavigationMixin(LightningElement) {
    records;
    error;
    columns = columns;
    draftValues = [];
    @track sortBy;
    @track sortDirection;
    @track cases=[];
    @api recordId;
    @api records;
    @api objectApiName;
    @track isShowModal = false;
    @track recordId;
    data1;
    @track records;
    @track selectedIds = [];
   

  
    @wire(getCustomerdetails)
    wiredAccount
   
    CustomerNameField = NAME_FIELD;
    CustomerBrandField=Brand_FIELD;
    CustomerModelField=Model_FIELD;
    KMSTravelledField = KMS_FIELD;
    FuelTypeField = Fuel_FIELD;
    VehicleColorField = Color_FIELD;
    MakeYearField = Make_FIELD;

    handleRowAction(event) 
    {
        const action = event.detail.action;
        const row = event.detail.row;

        switch (action.name) {
            case 'edit':
                this.editProduct(row);
                break;
            default:
        }
      
    }

    @track isShowModal = false;
    editProduct(row) 
    {
        this.recordId=row.Id;
        this.isShowModal = true;

    }
    saveHandle()
    {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Customer Enquiry Details Updated successfully',
                variant: 'success',
            })
        );
    }
    hideModalBox() 
    {  
        this.isShowModal = false;
    }
    deleterecords(event)
    {
        /*var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
      
          let ids = '';
          selectedRecords.forEach(currentItem => {
              ids = ids + ',' + currentItem.Id;
          });
          this.selectedIds = ids.replace(/^,/, '');
          */
          const selectedRows=event.detail.selectedRows; 
      this.selectedIds = []; 
      for (let i = 0; i < selectedRows.length; i++){           
          this.selectedIds.push(selectedRows[i].Id);
      }  
      
          
    
}

    deleteProduct() {
     
      deleteCustomerEnquiry({custId:this.selectedIds})
      .then(result => {               
          this.dispatchEvent( 
              new ShowToastEvent({
                  title: 'Success',
                  message: 'Selected  are deleted!',
                  variant: 'success',
              }),
          ); 
            })  
.then(() => {
    this.template.querySelector('lightning-datatable').selectedRows = [];
    // Refresh the @wire function to update the UI with the latest data
    return refreshApex(this.wiredAccount);
  })
    }
      
    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
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