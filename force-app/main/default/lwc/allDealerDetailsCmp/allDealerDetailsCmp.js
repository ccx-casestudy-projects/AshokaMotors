import { LightningElement,wire,track} from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

import allDealer from '@salesforce/apex/DealerquickCmpController.allDealer';

import {loadStyle} from 'lightning/platformResourceLoader';

import COLORS from '@salesforce/resourceUrl/Colors1';

const columns = [
    { label: 'Company', fieldName: 'Company__c' ,sortable: "true",cellAttributes: {
        style:"Font-weight:bold"       
    }},
    { label: 'Dealer Name', fieldName: 'Name',sortable: "true"},
    { label: 'Phone No', fieldName: 'Phone',sortable: "true" },
    { label: 'Email', fieldName: 'Email__c',sortable: "true" },
    { label: 'Address', fieldName: 'BillingAddress' ,sortable: "true"},
    { label: 'Aadhar No', fieldName: 'AM_Customer_Aadhar_Number__c' ,sortable: "true"},
    { label: 'Pancard No', fieldName: 'AM_Customer_Pan_Number__c' ,sortable: "true"},
]

export default class AllDealerDetailsCmp extends NavigationMixin(LightningElement)
{
    columns = columns;
    isCssLoaded = false
    @track sortBy='Name';
    @track sortDirection='asc';
    @wire(allDealer,{field : '$sortBy',sortOrder : '$sortDirection'})
    Dealer
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