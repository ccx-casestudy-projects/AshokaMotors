import { LightningElement,track,wire ,api} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import vehical_detail_obj from '@salesforce/schema/Product2';
import brand from '@salesforce/schema/Product2.AM_Brand__c';
import model from '@salesforce/schema/Product2.AM_Vehicle_Model__c';
import Make_Year from '@salesforce/schema/Product2.AM_Make_Year__c';

import insertDealerVehicleRecord from '@salesforce/apex/VehiclequickcompController.insertDealerVehicleRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import { NavigationMixin } from 'lightning/navigation';

export default class QuickDealerVehicleCmp extends NavigationMixin(LightningElement) 
{
    @track options1 = [];
    @track options2 = [];
    @track options3 = [];
 
    @track vehBrand='';
    @track vehModel='';
    @track vehRegNum='';
    @track vehRegDate='';
    @track makeYear='';
    @track purAmt='';
    @track kms='';
    @track vehVariant='';
    @track prfAmt='';
    @track purDate='';
    @track dealAmt='';
 
    handleModelChange(event)
    {
        const fieldName = event.target.name;
        const value = event.target.value;
        if (fieldName === 'vehModel') {
            this.vehModel = value;
        } 
    
       }
    handlebrandChange(event)
    {
        let key = this.slaFieldData.controllerValues[event.target.value];
        this.options2 = this.slaFieldData.values.filter(opt => opt.validFor.includes(key));
    
        const fieldName = event.target.name;
        const value = event.target.value;
        if (fieldName === 'vehBrand') {
            this.vehBrand = value;
        } 
    
       }

    handleFieldChange(event) 
    {
 
     const fieldName = event.target.name;
     const value = event.target.value;
     
     if (fieldName === 'vehRegNum') 
     {
         this.vehRegNum = value;
     } 
     if (fieldName === 'makeYear') {
         this.makeYear = value;
     }
     if (fieldName === 'purAmt') {
         this.purAmt = value;
     } 
     if (fieldName === 'vehVariant') {
         this.vehVariant = value;
     }
     if (fieldName === 'vehRegDate') 
     {
         this.vehRegDate = value;
     }
     if (fieldName === 'dealAmt') 
     {
         this.dealAmt = value;
     }
     if (fieldName === 'purDate') 
     {
         this.purDate = value;
     } 
     if (fieldName === 'kms') {
         this.kms = value;
     }
     if (fieldName === 'prfAmt') 
     {
         this.prfAmt = value;
     } 
     
     }
 
     @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
     objectInfo;
     @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: brand})
     typePicklistValues({error, data}) 
     {
         if(data) 
         {
             this.options1 = data.values;
         }
     }
     @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
     objectInfo;
     @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: model})
     typePicklistValues1({error, data}) 
     {
         if(data) 
         {
             if (data) this.slaFieldData = data;
         }
            
     }
     @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
     objectInfo;
     @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Make_Year})
     typePicklistValues2({error, data}) 
     {
         if(data) 
         {
             this.options3 = data.values;
         }
     }
    
    insertVehicle() 
    {
        console.log(this.vehRegNum);
        console.log(this.vehBrand);
        console.log(this.vehModel);
        console.log(this.makeYear);
        console.log(this.dealAmt);
        console.log(this.vehVariant);
        console.log(this.vehRegDate);
        console.log(this.kms);
        console.log(this.prfAmt);
        console.log(this.purDate);


    insertDealerVehicleRecord({ 
         vehName:this.vehRegNum,
         vehBrand:this.vehBrand,
         vehModel:this.vehModel,
         vehMake:this.makeYear,
         dealAmt:this.dealAmt,
         prfAmt: this.prfAmt,
         vehVariant:this.vehVariant,
         vehPurDate:this.purDate,
         vehRegDate: this.vehRegDate,
         vehKms: this.kms
     })
     .then(() => 
        {
           // const recordNumber = this.vehResNum;
            this.dispatchEvent
            (
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully created vehicle Information'+ this.vehResNum,
                    variant: 'success'
                })
            )
            this.goToMainScreen();
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
    
    }
    goToVehicleQuickmain()
            {
                let compDefinition = {
                    componentDef: "c:quickVehicleMainCmp",
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
            goToMainScreen()
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