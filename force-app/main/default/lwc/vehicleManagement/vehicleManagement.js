import { LightningElement ,track,wire} from 'lwc';
import getvehicleinfo from '@salesforce/apex/AMVehclRepairHandlerClass.getvehicleinfo';
import deleteSelectVehicles from '@salesforce/apex/AMVehclRepairHandlerClass.deleteSelectVehicles';

import NAME_FIELD from '@salesforce/schema/Product2.Name';
import STATUS_FIELD from '@salesforce/schema/Product2.AM_Vehicle_Status__c';
import FUEL_COST_FIELD from '@salesforce/schema/Product2.AM_Fuel_Cost__c';
import PROFIT_FIELD from '@salesforce/schema/Product2.AM_Profit__c';
import REPAIR_REQUIRED_FIELD from '@salesforce/schema/Product2.AM_Repair_Required__c';

import updateRepaireDetails from '@salesforce/apex/AmVehicleEntryController.updateRepaireDetails';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'

const columns = [
    { label: 'Vehicle  Name', fieldName: 'AM_Vehicle_Registration_Number__c',sortable: "true",cellAttributes: {
        class: 'slds-theme_shade slds-text-color_error',
        style:"Font-weight:bold"
        
    }},
    { label: 'Vehicle Owner Type', fieldName: 'AM_Vehicle_Type__c',sortable: "true" },
    { label: 'Vehicle Registration No', fieldName: 'Name',sortable: "true" },
    { label: 'Brand', fieldName: 'AM_Brand__c' ,sortable: "true"},
    { label: 'Model', fieldName: 'AM_Vehicle_Model__c' ,sortable: "true"},
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

export default class VehicleManagement extends NavigationMixin(LightningElement) {

    activeSections = ['B'];
    columns = columns;
    isCssLoaded = false


    @wire(getvehicleinfo,{field : '$sortBy',sortOrder : '$sortDirection',searchTerm1: '$searchTerm1',searchTerm2: '$searchTerm2',searchTerm3: '$searchTerm3',searchTerm4: '$searchTerm4'}) 
    Vehicles 
    @track sortBy='Name';
    @track sortDirection='asc';
    @track searchTerm1 = '';
    @track searchTerm2 = '';
    @track searchTerm3 = '';
    @track searchTerm4 = '';

    @track recordId;
    @track isModalOpen=false;
    
    
    REPAIR_REQUIRED_FIELD;

    
    goToMainScreen()
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
    
   
    handleSearch1(event) 
    {
        this.searchTerm1 = event.target.value;
    }
    handleSearch2(event) 
    {
        this.searchTerm2 = event.target.value;
    }
    handleSearch3(event) 
    {
        this.searchTerm3 = event.target.value;
    }
    handleSearch4(event) 
    {
        this.searchTerm4 = event.target.value;
    }


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
        switch (action.name) {
            case 'delete':
                this.deleteProduct(row);
                break;
            default:
        }
    }
    handleRepairRequired(event){
        this.vehRepairReq=event.target.value;
    }
    handleSuccess(event) 
    {
       this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Successfully updated vehicle details',
                variant: 'success'
            })
        );
    }
    closeModal() 
    {
        this.isModalOpen = false;
    }

    @track vehRepairReq ;
    NavToRepairs() 
    {
        this.isModalOpen = false;
        updateRepaireDetails({productId :this.recordId})
        .then(result => {
            this.vehRepairId = result;
           
            alert(this.vehRepairId);
            if (this.vehRepairId != null ) {
                let compDefinition = {
                    componentDef: "c:multiplerepairs",
                    attributes: {
                        repairId:this.vehRepairId
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
        })
       
    }
    editProduct(row) 
    {
        this.recordId=row.Id;
        this.isModalOpen = true;

    }
  
    deleteProduct(row)
    {
        deleteSelectVehicles({vid:row.Id})
        .then(() => {
            // Refresh the @wire function to update the UI with the latest data
            return refreshApex(this.Vehicles);
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
    doSorting(event) 
    {
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