import { LightningElement ,track,api} from 'lwc';

import searchDealer from '@salesforce/apex/DealerquickCmpController.searchDealer';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';

import noHeader from '@salesforce/resourceUrl/NoHeader';

import {loadStyle} from "lightning/platformResourceLoader";

export default class SearchEditDealerComponent extends NavigationMixin(LightningElement)
{
    @track isModalOpen=true;
    @track dealerCompany;
    @track dealerNum;
    @api objectApiName;
    @track recordId;

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
 
    
    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }

    closeModal() 
    {
        this.isModalOpen = false;
    }
    handleSearchCompany(event)
    {
        this.dealerCompany=event.target.value;
    }
    handleSearchNumber(event)
    {
        this.dealerNum=event.target.value;
    }
    handlesearch()
    {
            searchDealer({ dealerCompany: this.dealerCompany, dealerNum: this.dealerNum })
                .then((result) => {
                    this.recordId = result;
                   
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
    
            this.isModalOpen = false;
        }
    handleSuccess()
    {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Dealer Details Update Successfully',
                variant: 'success',
            })
            
        )
    }
}