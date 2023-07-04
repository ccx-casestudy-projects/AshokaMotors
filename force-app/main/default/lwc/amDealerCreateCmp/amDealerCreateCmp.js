import { LightningElement ,track,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import searchDealerAccount from '@salesforce/apex/AmVehicleDealerController.searchDealerAccount'; 

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
  
    { label: 'Dealer Name', fieldName: 'Name',sortable: "true" },
    { label: 'Dealer Phone', fieldName: 'Phone' ,sortable: "true"},
    { label: 'Dealer Email', fieldName: 'Email__c' ,sortable: "true"}
];

export default class AmDealerCreateCmp extends NavigationMixin(LightningElement) 
{
    @track selectedValue = '';
    @track exDealer = false;
    @track newDealer = false;
    @track phonenum;
    @track data;
    @track records;
    columns = columns;

    get options() {
        return [
            { label: 'Existing Dealer', value: 'dealer' },
            { label: 'New Dealer', value: 'customer' },
        ];
    }

    handleChange(event) {
        this.selectedValue = event.detail.value;
        if (this.selectedValue === 'dealer') {
            this.exDealer = true;
            this.newDealer = false;
        } else if (this.selectedValue === 'customer') {
            this.exDealer = false;
            this.newDealer = true;
        }
    }
    handleDealer(event)
    {
        this.phonenum=event.target.value;
        
    }
    handleSearch()
    {
        alert(this.phonenum);
        searchDealerAccount({phoneNum:this.phonenum})
        .then(result => 
            {
              this.data=result;
              this.records= this.data;
            
             })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error : ' + error.body.message,
                    variant: 'error'
                })
            );
         });
    }
}