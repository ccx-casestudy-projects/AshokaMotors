import { LightningElement ,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";

export default class QuickVehicleMainCmp extends NavigationMixin(LightningElement) 
{
    @track selectedValue = '';
    @track isDealer = false;
    @track isCustomer = false;

    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }
    
    get options() {
        return [
            { label: 'Dealer Vehicle', value: 'dealer' },
            { label: 'Customer Vehicle', value: 'customer' },
        ];
    }

    handleChange(event) {
        this.selectedValue = event.detail.value;
        if (this.selectedValue === 'dealer') {
            this.isDealer = true;
            this.isCustomer = false;
            if(this.isDealer = true){
                let compDefinition = {
                    componentDef: "c:quickDealerVehicleCmp",
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
        } else if (this.selectedValue === 'customer') {
            this.isDealer = false;
            this.isCustomer = true;
            if(this.isCustomer = true){
                let compDefinition = {
                    componentDef: "c:amVechicleQuickComponent",
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
        
    }

    gotoVehicleHome(event)
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