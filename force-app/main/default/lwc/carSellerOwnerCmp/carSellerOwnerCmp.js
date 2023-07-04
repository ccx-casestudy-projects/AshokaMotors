import { LightningElement ,track,wire,api} from 'lwc';
import getCarOwners from '@salesforce/apex/AMVehclRepairHandlerClass.getCarOwners';

import { NavigationMixin } from 'lightning/navigation';

import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'

const columns1 = [ 
    { label: 'Vehicle No',sortable: "true", fieldName: 'Name',cellAttributes: {style: 'font-weight:bold'} },
    { label: 'Owner Name', sortable: "true", fieldName: 'AM_Owner_Name__c',initialWidth:95 },
    { label: 'Owner Phone', sortable: "true",fieldName: 'AM_Owner_Phone__c' ,initialWidth:95},
    { label: 'Owner Email', sortable: "true", fieldName: 'AM_Owner_Email__c'},
    { label: 'Owner Aadhar', sortable: "true", fieldName: 'AM_Owner_Adhar_Number__c'},
];

const columns2 = [  
    { label: 'Vehicle No',sortable: "true", fieldName: 'Name'},
    { label: 'Owner Name', sortable: "true", fieldName: 'AM_Owner_Name__c',initialWidth:95 },
    { label: 'Owner Phone', sortable: "true",fieldName: 'AM_Owner_Phone__c' ,initialWidth:95},
    { label: 'Owner Email', sortable: "true", fieldName: 'AM_Owner_Email__c'},
    { label: 'Owner Aadhar', sortable: "true", fieldName: 'AM_Owner_Adhar_Number__c'},
    { label: 'Dealer Name', sortable: "true",fieldName: 'AM_Dealer_Name__c',initialWidth:95},
    { label: 'Company', sortable: "true",fieldName: 'AM_Customer__r.Company__c'},
    { label: 'Dealer Email', sortable: "true", fieldName: 'AM_Dealer_Email__c'},
    { label: 'Dealer Phone', sortable: "true", fieldName: 'AM_Dealer_Phone__c'},
];

export default class CarSellerOwnerCmp extends NavigationMixin(LightningElement) {


    searchTerm = '';

    get statusOptions() {
        return [
            { label: 'Owner', value: 'Owner' },
            { label: 'Dealer', value: 'dealer' }
        ];
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
    
    columns = columns2;
    isCssLoaded = false

    @wire(getCarOwners,{field : '$sortBy',sortOrder : '$sortDirection',searchTerm: '$searchTerm'}) Vehicles 
    @track sortBy='Name';
    @track sortDirection='asc';
    @track searchTerm = '';

    handleSearch(event) 
    {
        this.searchTerm = event.detail.value;
        if (this.searchTerm.toLowerCase() === 'dealer') 
        {
            this.columns = columns2;
        }
        if (this.searchTerm.toLowerCase() === 'Owner') 
        {
            this.columns = columns1;
        }
    }

 
    doSorting(event) {
        // calling sortdata function to sort the data based on direction and selected field
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }
    
    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }
}