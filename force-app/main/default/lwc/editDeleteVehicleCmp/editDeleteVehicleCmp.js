import { LightningElement ,track,api,wire} from 'lwc';

import searchProduct from '@salesforce/apex/VehiclequickcompController.searchProduct';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";

export default class EditDeleteVehicleCmp extends LightningElement 
{
    @track isModalOpen=true;
    @track vehNum;
    @track recordId;

    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }

    closeModal() 
    {
        this.isModalOpen = false;
    }
    handleSearchNumber(event){
        this.vehNum=event.target.value;
    }
    handlesearch(){
        searchProduct({vehNumber:this.vehNum})
       .then(result => {
            alert(result);
            this.recordId = result;
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in creating vehicle  Information: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
        this.isModalOpen = false;
    }
}