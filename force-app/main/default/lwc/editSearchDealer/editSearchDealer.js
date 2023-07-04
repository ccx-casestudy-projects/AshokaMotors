import { LightningElement,track,api } from 'lwc';

import searchDealer from '@salesforce/apex/DealerquickCmpController.searchDealer';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';

import noHeader from '@salesforce/resourceUrl/NoHeader';

import {loadStyle} from "lightning/platformResourceLoader";

export default class EditSearchDealer extends NavigationMixin(LightningElement) {
    @track showSearchPopup = true;
    @track showRecordForm = false;
    @track dealerCompany;
    @track dealerNum;
    @api objectApiName;
    @track recordId;

    connectedCallback() {
        loadStyle(this, noHeader);
    }

    closeModal() {
        this.showSearchPopup = false;
    }

    handleSearchCompany(event) {
        this.dealerCompany = event.target.value;
    }

    handleSearchNumber(event) {
        this.dealerNum = event.target.value;
    }

    handlesearch() {
        searchDealer({ dealerCompany: this.accountName, dealerNum: this.dealerNum })
            .then((result) => {
                this.recordId = result;
                this.showSearchPopup = false;
                this.showRecordForm = true;
            })
            .catch((error) => {
                console.error('Error retrieving dealer:', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Failed to retrieve dealer information.',
                        variant: 'error',
                    })
                );
            });
    }

    handleSuccess() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Dealer Details Update Successfully',
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
    }

    showSearchEditPopup() {
        this.showSearchPopup = true;
        this.showRecordForm = false;
    }

    @track accountName;  
    @track accountRecordId;  
 
  onAccountSelection(event){  
    this.accountName = event.detail.selectedValue;  
    this.accountRecordId = event.detail.selectedRecordId;  
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