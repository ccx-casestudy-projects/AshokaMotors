import { LightningElement ,wire,track,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//import getallvehciles2 from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails2';

import {loadStyle} from 'lightning/platformResourceLoader'

export default class Customerpreference extends NavigationMixin(LightningElement) {
    @track records;
    
    keyIndex = 0;



    @track itemList = [
        {
            id: 0
        }
    ];
   
    indexupdate()
    {
        this.index++;
    }
    addRow() {
        ++this.keyIndex;
        var newItem = [{ id: this.keyIndex }];
        this.itemList = this.itemList.concat(newItem);
        
    }

    removeRow(event) {
        if (this.itemList.length >= 2) {
            this.itemList = this.itemList.filter(function (element) {
                return parseInt(element.id) !==
                parseInt(event.target.accessKey);
            });
        }
    }
    handlebrand(event){
        this.searchbrand = event.target.value; 
    }
    handlemodelyear(event){
        this.searchmakeyear = event.target.value; 
    }
    handlecolor(event){
        this.searchcolor = event.target.value; 
    }
    handlefuel(event){
        this.searchfueltype = event.target.value; 
    }
    handletransmission(event){
        this.searchtransmissiontype = event.target.value; 
    }

    handleSubmit() 
    {
        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element=> {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) {
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element=> {
                element.submit();
            });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Repair Detail Successfully Created',
                    variant: 'success',
                }),
            );
            
        }
        let compDefinition = {
            componentDef: "c:disaplaycars",
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