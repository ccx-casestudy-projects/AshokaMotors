import { LightningElement ,track,wire} from 'lwc';
import getAllCustomerEnquirys from '@salesforce/apex/CustomerEnquiryController.getAllCustomerEnquirys';
import deleteSelectCustomerEnquirys from '@salesforce/apex/CustomerEnquiryController.deleteSelectCustomerEnquirys';


import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';


import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'

const columns = [
    { label: 'Enquiry Name', fieldName: 'Name',sortable: "true",cellAttributes: {
        class: 'slds-theme_shade slds-text-color_error',
        style:"Font-weight:bold"
        
    }},
    { label: 'Customer Name', fieldName: 'AM_Customer_Name__c',sortable: "true" },
    { label: 'CarBrand', fieldName: 'AM_Brand__c',sortable: "true",actions: [ { label: "All", checked: true, name: "all" },{ label: "Maruti Suzuki", checked: true, name: "Maruti Suzuki" },
    { label: "Tata", checked: false, name: "Tata" },{ label: "Hyundai", checked: false, name: "Hyundai" },
    { label: "Mahindra", checked: false, name: "Mahindra" },{ label: "BMW", checked: true, name: "BMW" },
    { label: "Toyota", checked: false, name: "Toyota" },{ label: "Mercedes-Benz", checked: false, name: "MercedesBenz" },
    { label: "Mahindra", checked: false, name: "Mahindra" },{ label: "Kia", checked: true, name: "Kia" },
    { label: "Honda", checked: false, name: "Honda" },{ label: "Audi", checked: false, name: "Audi" },
    { label: "Ford", checked: false, name: "Ford" },{ label: "Volkswagen", checked: false, name: "Volkswagen" },
    { label: "Renault", checked: false, name: "Renault" }
  ]},
    { label: 'Enquiry Status', fieldName: 'AM_Customer_Enquiry_Status__c' ,sortable: "true",
              actions:[{ label: "Filter", checked: false, name: "filter",iconName:"utility:filterList", typeAttributes: {
              type: 'text',
              label: 'Enter value',
             placeholder: 'Enter a value'} 
            }]
    },

    { label: 'Customer Enquiry', fieldName: 'AM_Customer_Enquiry_Status__c	',sortable: "true" },
    { label: "Created", checked: false, name: "Created" },
    { label: "Follow Up	", checked: false, name: "Follow Up	" },
    { label: "Negotiation", checked: false, name: "Negotiation	" },
    { label: "Waiting", checked: false, name: "Waiting" },
    { label: "Confirmed", checked: false, name: "Confirmed" },
    { label: "Closed Won", checked: false, name: "Closed Won" },
    { label: "Closed Lost", checked: false, name: "Closed Lost" },

    { label: 'Budget Range', fieldName: 'AM_Budget_Range__c',sortable: "true"},
    { label: 'Phone', fieldName: 'AM_Customer_Phone__c' ,sortable: "true"},
    
    { label: 'Edit', type: 'button', typeAttributes: { 
        label: 'Edit', 
        name: 'edit',
        iconName: 'utility:edit',
        variant: 'brand'
      }
    },
    { label: 'Delete',type: 'button', typeAttributes: { 
        label: 'Delete', 
        name: 'delete',
        iconName: 'utility:delete',
        variant: 'brand'
      }
    }
];

export default class CustomEnquiry extends  NavigationMixin(LightningElement) {
    columns = columns;
    isCssLoaded = false;
    @track sortBy;
    @track sortDirection;
    @track searchTerm = '';
    @track cases=[];
    ALL_CASES = [];
    latestActions = [];
  
  
    @wire(getAllCustomerEnquirys,{searchTerm: '$searchTerm'}) 
    wiredCases({ error, data }) {
      if (data) {
          
          this.ALL_CASES = data;
          this.cases = data;
          this.error = undefined;
      } else if (error) {
          this.error = error;
          this.contacts = undefined;
      }
  }
  handleHeaderAction(event) {
      const actionName = event.detail.action.name;
      const colDef = event.detail.columnDefinition;
      const cols = [...this.columns];
  
      
      cols.find(col => col.label === colDef.label).actions.forEach(action => {
          action.checked = action.name === actionName;
      });
  
      
      this.columns = cols;
  
      if (actionName !== 'all') {
          
          this.cases = this.ALL_CASES.filter(record => record.AM_Brand__c === actionName);
      } else {
          
          this.cases = this.ALL_CASES;
      }
  }
  doSorting(event) 
  {
        this.sortBy = event.detail.fieldName;       
        this.sortDirection = event.detail.sortDirection;       
        this.sortReceiptData(event.detail.fieldName, event.detail.sortDirection);
    
  }
  sortReceiptData(fieldname, direction) {
    
    let parseData = JSON.parse(JSON.stringify(this.cases));
   
    let keyValue = (a) => {
        return a[fieldname];
    };

   let isReverse = direction === 'asc' ? 1: -1;

       parseData.sort((x, y) => {
        x = keyValue(x) ? keyValue(x) : ''; 
        y = keyValue(y) ? keyValue(y) : '';
       
        return isReverse * ((x > y) - (y > x));
    });
    
    this.cases = parseData;

  }

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

    editProduct(row) 
    {
        let compDefinition = {
            componentDef: "c:CustomerDetailsComp",
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

    deleteProduct(row)
    {
        deleteSelectCustomerEnquirys({Cid:row.Id})
        .then(() => {
            // Refresh the @wire function to update the UI with the latest data
            return refreshApex(this.CustomerEnquiry);
        })
        .then(() => {
            // Display a success toast message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Vehicle deleted successfully',
                    variant: 'success',
                })
            );
        })
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