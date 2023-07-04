import { LightningElement ,track,api,wire} from 'lwc';

import searchProduct from '@salesforce/apex/VehiclequickcompController.searchProduct';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";



export default class EditDeleteVehicleCmp extends NavigationMixin(LightningElement)
{
    @track isModalOpen=true;
    @track isUpdateBox=false;
    @track vehNum;
    @api objectApiName;
   @track recordId;

   @track selectedValue;
   @track picklistOptions = [];
   
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
        .then(result => {
            this.recordId = result;
            if(this.recordId){
                this.isModalOpen = false;
                this.isUpdateBox=true;
             }
         })
         .catch(error => {
             this.dispatchEvent(
                 new ShowToastEvent({
                     title: 'Error',
                     message: 'Error in verified vehicle Information: ' + error.body.message,
                     variant: 'error'
                 })
             );
         });
    }
    /*
    handlesearch()
    {
        searchProduct({vehNumber:this.vehNum})
        .then(result => {
            this.recordId = result;
            if(this.recordId){
                this.isModalOpen = false;
                this.isUpdateBox=true;
             }
         })
         .catch(error => {
             this.dispatchEvent(
                 new ShowToastEvent({
                     title: 'Error',
                     message: 'Error in verified vehicle Information: ' + error.body.message,
                     variant: 'error'
                 })
             );
         });
         
        
        
    }*/

    handleSuccess()
    {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Vehicle Details update successfully',
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