import { LightningElement ,track,api,wire} from 'lwc';

import searchProduct from '@salesforce/apex/VehiclequickcompController.searchProduct';
import updateRepaireDetails from '@salesforce/apex/VehiclequickcompController.updateRepaireDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";

export default class SearchAddRepairsCmp extends NavigationMixin(LightningElement )
{
    
    @track isModalOpen=true;
    @track isModalOpen1=false;
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
        this.isModalOpen1 = false;
        this.isModalOpen = false;
        this.handleback();
    }
    handleSearchNumber(event)
    {
        this.vehNum=event.target.value;
    }

    onAccountSelection(event)
    {  
        this.vehName = event.detail.selectedValue;  
        this.vehRecordId = event.detail.selectedRecordId;  
    }  


    handlesearch()
    {
        searchProduct({vehNumber:this.vehName})
        .then((result) => 
        {
           this.recordId=result;
        });
        this.isModalOpen = false;
        this.isModalOpen1 = true;
        
    }
    handleSuccess()
    {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Vehicle Details update successfully',
                variant: 'success',
            })
        )
        
        updateRepaireDetails({productId : this.recordId})
        .then(result => {
            this.vehRepairId = result;
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
        this.isModalOpen1 = false;
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