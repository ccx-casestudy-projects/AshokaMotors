import { LightningElement ,track,api} from 'lwc';

import searchDealer from '@salesforce/apex/DealerquickCmpController.searchDealer';
import deleteDealer from '@salesforce/apex/DealerquickCmpController.deleteDealer';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";


export default class SearchDeleteDealerCmp extends NavigationMixin(LightningElement) {
    @track isModalOpen=true;
    @track dealerName;
    @track dealerNum;
    @api objectApiName;
    recordId;

    @track accountName;
    @track accountRecordId;

    onAccountSelection(event){  
        this.accountName = event.detail.selectedValue;  
        this.accountRecordId = event.detail.selectedRecordId;  
        }

    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }

    closeModal() 
    {
        this.isModalOpen = false;
    }
 /*   handleSearchName(event)
    {
        this.dealerName=event.target.value;
    }
    handleSearchNumber(event)
    {
        this.dealerNum=event.target.value;
    }
    handlesearch()
     {
        searchDealer({ dealerName: this.accountName })
            .then((result) => {
                this.recordId = result;
                alert(result);
                this.handleDelete();
            })
            .catch((error) => {
                console.error('Error searching dealer:', error);
            });
    
        this.isModalOpen = false;
    }*/
    
    handleDelete() {
      //  alert(this.accountRecordId);
        deleteDealer({ dealerId: this.accountRecordId })
            .then(() => {
                const recordNumber = this.dealerName;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Vehicle details deleted successfully: ' + recordNumber,
                        variant: 'success',
                    })
                );
                let compDefinition = {
                    componentDef: 'c:homescreen',
                    attributes: {},
                };

                // Base64 encode the compDefinition JS object
                let encodedCompDef = btoa(JSON.stringify(compDefinition));
                this[NavigationMixin.Navigate]({
                    type: 'standard__webPage',
                    attributes: {
                        url: '/one/one.app#' + encodedCompDef,
                    },
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

  
}