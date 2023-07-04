import { LightningElement ,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import multiplerepairs from '@salesforce/resourceUrl/multiplerepairs'
import {loadStyle} from 'lightning/platformResourceLoader'

export default class Multiplerepairs extends NavigationMixin(LightningElement) {
    
    keyIndex = 0;
    isCssLoaded = false;
    @api repairId;

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

    handleSubmit() {
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
            
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'Please enter fields Correctly',
                    variant: 'error',
                }),
            );
        }
        //Navigation to Vehicle Management screen
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
    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, multiplerepairs).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }
    gotoHome(){
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
        this.repairsId=this.repairId;
    }
}