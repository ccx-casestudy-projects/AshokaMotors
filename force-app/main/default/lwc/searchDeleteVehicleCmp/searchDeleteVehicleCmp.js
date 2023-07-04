import { LightningElement ,track,api,wire} from 'lwc';

import searchProduct from '@salesforce/apex/VehiclequickcompController.searchProduct';
import deleteVehicle from '@salesforce/apex/VehiclequickcompController.deleteVehicle';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";

export default class SearchDeleteVehicleCmp extends NavigationMixin(LightningElement)
 {
    @track isModalOpen=true;
    @track vehNum;
    @api objectApiName;
    recordId;

    @track vehName;  
    @track vehRecordId;  
 
    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }

    closeModal() 
    {
        this.isModalOpen = false;
        this.handleback();
    }
    handleSearchNumber(event)
    {
        this.vehNum=event.target.value;
    }

    onAccountSelection(event){  
        this.vehName = event.detail.selectedValue;  
        this.vehRecordId = event.detail.selectedRecordId;  
    }  
    
    handlesearch(){
        searchProduct({vehNumber:this.vehName})
        .then((result) => {
           // alert(result);
            this.recordId=result;
            this.handleDelete();
        });
       
      
        this.isModalOpen = false;
        
        
    }
    handleDelete()
    {
     
       deleteVehicle({productId:this.recordId})
       const recordNumber = this.vehName;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Vehicle delete successfully Vehicle Number  '+ recordNumber,
                variant: 'success',
            })
        )
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
    handleback(){
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