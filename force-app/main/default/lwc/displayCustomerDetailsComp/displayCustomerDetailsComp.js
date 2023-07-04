import { LightningElement ,track,wire} from 'lwc';
import displayCustomerRecords from '@salesforce/apex/CustomerEnquiryDetailsController.displayCustomerRecords';
import deleteCustomerRecords from '@salesforce/apex/CustomerEnquiryDetailsController.deleteCustomerRecords';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import CustomerPhone from '@salesforce/schema/Account.Phone';
import CustomerEmail from '@salesforce/schema/Account.Email__c';
import CustomerAddress from '@salesforce/schema/Account.BillingAddress';


import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'

const columns = [
    { label: 'Customer Name', fieldName: 'Name' ,sortable: "true",cellAttributes: {
        class: 'slds-theme_shade slds-text-color_error',
        style:"Font-weight:bold"
        
    }},
    { label: 'Email', fieldName: 'Email__c' ,sortable: "true"},
    { label: 'Phone', fieldName: 'Phone' ,sortable: "true"},
    { label: 'Edit', type: 'button', typeAttributes: { 
        label: 'Edit', 
        name: 'edit',
        iconName: 'utility:edit',
        variant: 'brand'
      }
    },
    { label: 'Delete', type: 'button', typeAttributes: { 
        label: 'Delete', 
        name: 'delete',
        iconName: 'utility:delete',
        variant: 'brand'
      }
    }
];
export default class DisplayCustomerDetailsComp extends NavigationMixin(LightningElement) {
    CallMain()
    {
        let compDefinition = {
            componentDef: "c:SideBarAllComponents",
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
    CallCustomerEntry()
     {
        let compDefinition = {
            componentDef: "c:customerregandpref",
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
    columns = columns;
    isCssLoaded = false
    @track cusRecordId;
    @track sortBy='Name';
    @track sortDirection='asc';
    @track searchTerm = '';

    @wire(displayCustomerRecords,{field : '$sortBy',sortOrder : '$sortDirection',searchTerm: '$searchTerm'}) Customers;

    handleSearch(event) 
    {
        this.searchTerm = event.target.value;
    }

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;

        switch (action.name) {
            case 'edit':
                this.editProduct(row);
                break;
            default:
        }
        switch (action.name) {
            case 'delete':
                this.deleteProduct(row);
                break;
            default:
        }
    }
    nameField = NAME_FIELD;
    emailField = CustomerEmail;
    phoneField = CustomerPhone;
    addField=CustomerAddress;
    @track recordId;
    @track isShowModal = false;
    editProduct(row) 
    {
        alert(row.Id)
        this.recordId=row.Id;
        this.isShowModal = true;

    }
    saveHandle()
    {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Customer Details Updated successfully',
                variant: 'success',
            })
        );
    }
    hideModalBox() 
    {  
        this.isShowModal = false;
        setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
       }, 1000); 
    }
    deleteProduct(row)
    {
        alert(row.Id);
        deleteCustomerRecords({acrecordId:row.Id})
        .then(() => {
            return refreshApex(this.Customers);
         });
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