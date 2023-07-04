import { LightningElement,track,wire ,api} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import vehical_detail_obj from '@salesforce/schema/Product2';
import brand from '@salesforce/schema/Product2.AM_Brand__c';
import model from '@salesforce/schema/Product2.AM_Vehicle_Model__c';
import Make_Year from '@salesforce/schema/Product2.AM_Make_Year__c';

import insertVehicleRecord from '@salesforce/apex/VehiclequickcompController.insertVehicleRecord';

import gotoVehicleRepairDetail from '@salesforce/apex/VehiclequickcompController.gotoVehicleRepairDetail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import { NavigationMixin } from 'lightning/navigation';

export default class AMVehicleQuickComponent extends NavigationMixin(LightningElement) {
   @api options1 = [];
   @api options2 = [];
   @api options3 = [];
  
   @api recordId;
   @track vehRepairId=false;

   @api vehBrand='';
   @api vehModel='';
   @api vehResNum='';
   @api vehRegDate='';
   @api makeYear='';
   @api vehRepairReq='';
   @api vehActive='';
   @api purAmt='';
   @api kms='';
   @api vehVariant='';
   @api prfAmt='';
   @track purDate='';

   @track repair=false;

   handleModelChange(event)
   {
    const fieldName = event.target.name;
    const value = event.target.value;
    if (fieldName === 'vehModel') 
    {
        this.vehModel = value;
    } 

   }
   handleBrandChange(event){
    let key = this.slaFieldData.controllerValues[event.target.value];
    this.options2 = this.slaFieldData.values.filter(opt => opt.validFor.includes(key));

    const fieldName = event.target.name;
    const value = event.target.value;
    if (fieldName === 'vehBrand') {
        this.vehBrand = value;
    } 

   }
   handleRepairRequired(event)
   {
        this.repair=event.target.checked;
        console.log(this.repair);
   }
   handleFieldChange(event) {
   

    const fieldName = event.target.name;
    const value = event.target.value;

    
    if (fieldName === 'vehResNum') {
        this.vehResNum = value;
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
    if (fieldName === 'vehRegDate') {
        this.vehRegDate = value;
    }
    if (fieldName === 'purDate') {
        this.purDate = value;
    } 
    if (fieldName === 'kms') {
        this.kms = value;
    }
    if (fieldName === 'prfAmt') {
        this.prfAmt = value;
    } 
    }

    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: brand})
    typePicklistValues({error, data}) {
        if(data) {
            this.options1 = data.values;
        }
           
        
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: model})
    typePicklistValues1({error, data}) {
        if(data) {
            if (data) this.slaFieldData = data;
        }
           
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Make_Year})
    typePicklistValues2({error, data}) {
        if(data) {
            this.options3 = data.values;
        }
    }
   
    HandleInsert(event) 
    { 
        console.log('Hello');
        console.log(this.vehResNum);
        console.log(this.vehBrand);
        console.log(this.vehModel);
        console.log(this.makeYear);
        console.log(this.repair);
        console.log(this.purAmt);
        console.log(this.prfAmt);
        console.log(this.vehVariant);
        console.log(this.vehRegDate);
        console.log(this.purDate);
        console.log(this.kms);

        insertVehicleRecord({vehName:this.vehResNum,vehBrand:this.vehBrand,vehModel:this.vehModel,vehMake:this.makeYear,vehRepair:this.repair,vehPurAmt:this.purAmt,prfAmt:this.prfAmt,vehVariant:this.vehVariant,vehPurDate:this.purDate,vehRegDate:this.vehRegDate,vehKms:this.kms})

        .then(result => 
        {
            this.productid=result;
            const recordNumber = this.vehResNum;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Vehicle Inserted successfully '+ recordNumber ,
                    variant: 'success',
                })
            )


            gotoVehicleRepairDetail({productId:this.productid})
            .then(result => 
                {
                    this.repairedId=result;
                    // Display a success toast message
                    this.dispatchEvent
                    (
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Repair Inserted successfully '+ this.repairedId ,
                            variant: 'success',
                        })
                    )
        
           
                let compDefinition = {
                    componentDef: "c:multiplerepairs",
                    attributes: {
                        repairId:this.repairedId
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
            })
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Vehicle Not Inserted successfully',
                    variant: 'Error',
                })
            )
        });

    }
    goToVehicleQuickmain(){
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
}