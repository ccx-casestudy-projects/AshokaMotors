import { LightningElement,track,wire,api} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import vehical_detail_obj from '@salesforce/schema/Product2';

import brand from '@salesforce/schema/Product2.AM_Brand__c';
import model from '@salesforce/schema/Product2.AM_Vehicle_Model__c';
import bodytype from '@salesforce/schema/Product2.AM_Body_Type__c';
import color from '@salesforce/schema/Product2.AM_Vehicle_Color__c';
import Vehiclecapacity from '@salesforce/schema/Product2.AM_Vehicle_Capacity__c';
import transmissionType from '@salesforce/schema/Product2.AM_Transmission_Type__c';
import vehicleAge from '@salesforce/schema/Product2.AM_Vehicle_Age__c';
import Fuel_Type from '@salesforce/schema/Product2.AM_Fuel_Type__c';
import AM_No_of_Pre_Owner from '@salesforce/schema/Product2.AM_No_of_Pre_Owner__c';
import AM_Odometer_Status from '@salesforce/schema/Product2.AM_Odometer_Status__c';
import Battery_Type from '@salesforce/schema/Product2.AM_Battery_Type__c';
import Make_Year from '@salesforce/schema/Product2.AM_Make_Year__c';
import fundedFrom from '@salesforce/schema/Product2.AM_Purchase_Funded_From__c';
import Vehicle_Owner_Type from '@salesforce/schema/Product2.AM_Vehicle_Owner_Type__c';

import insertVehicleInformation from '@salesforce/apex/AmVehicleEntryController.insertVehicleInformation'; 
import updateVehicleDetails from '@salesforce/apex/AmVehicleEntryController.updateVehicleDetails'; 
import updateOwnerDetails from '@salesforce/apex/AmVehicleEntryController.updateOwnerDetails'; 
import uploadVehicleImages from '@salesforce/apex/AmVehicleEntryController.uploadVehicleImages';  
import updateServicingDetails from '@salesforce/apex/AmVehicleEntryController.updateServicingDetails'; 
import updateSubWarranty from '@salesforce/apex/AmVehicleEntryController.updateSubWarrantyDetails';

import uploadAttachment from '@salesforce/apex/AmVehicleEntryController.uploadAttachment';

import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class AM_VehicleEntryComp extends NavigationMixin(LightningElement) 
{
    
    @track currentStep = '1';
    @track options1 = [];
    @track options2 = [];
    @track options3 = [];
    @track options4 = [];
    @track options5 = [];
    @track options6 = [];
    @track options7 = [];
    @track options9 = [];
   // @track options10 = [];
    @track options11 = [];
    @track options14 = [];
    @track options15 = [];
    @track options16 = [];
    @track options13 = [];
    @track options18 = [];

    @track recordId;

    
    @track vehBrand='';
    @track vehModel='';
    @track vehResNum='';
    @track fueltype='';
    @track vehColor='';
    @track fuelPrice='';
    @track kiloWatt='';
    @track purAmt='';
    @track purDate='';
    @track odoStatus='';
    @track vehRegDate='';
    @track vehTranType='';
    @track vehAge='';
    @track makeYear='';
    @track fundfrom='';
    @track vehVariant='';
    @track profit='';
    @track kms='';
    @track vehLoan='';
    @track vehRepairReq='';
    @track vehRenew='';
    //@track vehActive='';
    //@track vehStatus='';

    @track vehBody='';
    @track vehCap='';
    @track chsNum='';
    @track engNum='';
    @track fueltank='';
    @track batterytype='';
    @track engineCap='';

    @track ownerName='';
    @track ownerPhone='';
    @track ownerEmail='';
    @track owntype='';
    @track ownerAdhar='';
    @track owneraddress='';
    @track preOwner='';
    @track vehInsurance='';
    @track vehRTA='';
    @track vehBank='';


    @track vehmain='';
    @track vehImg1='';
    @track vehImg2='';
    @track vehImg3='';
    @track vehImg4='';

    
    @track serviceActive='';
    @track oemService='';
    @track serviceLD='';
    @track serviceND='';

    @track subCount='';
    @track warrantyCount='';
    @track warStrartDate='';
    @track warEndDate='';


    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }

    @track showKilowattField = false;

    
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
    handleModelChange(event) 
    {
        const fieldName = event.target.name;
        const value = event.target.value;
        if (fieldName === 'vehModel') 
        {
            this.vehModel = value;
        }  
    }

    handleFieldChange(event) 
    {
        
        const fieldName = event.target.name;
        const value = event.target.value;
       
         if (fieldName === 'vehResNum') {
            this.vehResNum = value;
        } 
       
        if (fieldName === 'vehColor') {
            this.vehColor = value;
        } 
        if (fieldName === 'fueltype') 
        {
            this.fueltype = value;
            if (value === 'Electric') 
            {
              this.showKilowattField = true;
            } 
            else 
            {
              this.showKilowattField = false;
            }
        }
        if (fieldName === 'kiloWatt') 
        {
            this.kiloWatt = value;
        }
        if (fieldName === 'fuelPrice') 
        {
            this.fuelPrice = value;
        }
        if (fieldName === 'purAmt') 
        {
            this.purAmt = value;
        } 
        if (fieldName === 'purDate') 
        {
            this.purDate = value;
        } 
        if (fieldName === 'odoStatus') 
        {
            this.odoStatus = value;
        }
        if (fieldName === 'vehRegDate') 
        {
            this.vehRegDate = value;
        }
        if (fieldName === 'vehTranType') 
        {
            this.vehTranType = value;
        }
        if (fieldName === 'vehAge') 
        {
            this.vehAge = value;
        }
        if (fieldName === 'makeYear') 
        {
            this.makeYear = value;
        } 
        if (fieldName === 'fundfrom') 
        {
            this.fundfrom = value;
        }
        if (fieldName === 'vehVariant') {
            this.vehVariant = value;
        }
        if (fieldName === 'profit') {
            this.profit = value;
        } 
        if (fieldName === 'kms') {
            this.kms = value;
        }
        if (fieldName === 'vehLoan') {
            this.vehLoan = event.target.checked;
        }
        if (fieldName === 'vehRepairReq') {
            this.vehRepairReq = event.target.checked;
        } 
        if (fieldName === 'vehRenew') {
            this.vehRenew = event.target.checked;
        }
        
    }

    handleFieldChange2(event) 
    {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'vehBody') {
            this.vehBody = value;
        } 
        if (fieldName === 'vehCap') {
            this.vehCap = value;
        } 
       if (fieldName === 'batterytype') {
            this.batterytype = value;
        }
        if (fieldName === 'fueltank') {
            this.fueltank = value;
        }
        if (fieldName === 'engineCap') {
            this.engineCap = value;
        }
       if (fieldName === 'engNum') {
            this.engNum = value;
        }
        if (fieldName === 'chsNum') {
            this.chsNum = value;
        }
        if (fieldName === 'owntype') {
            this.owntype = value;
        }
        if (fieldName === 'preOwner') {
            this.preOwner = value;
        }
        if (fieldName === 'vehInsurance') {
            this.vehInsurance = event.target.checked;
        } 
         if (fieldName === 'vehRTA') {
            this.vehRTA = event.target.checked;
        } 
        if (fieldName === 'vehBank') {
            this.vehBank = event.target.checked;
        }  
    }
    handleFieldChange3(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
        if (fieldName === 'vehmain') {
            this.vehmain = value;
        } 
        if (fieldName === 'vehImg1') {
            this.vehImg1 = value;
        } 
        if (fieldName === 'vehImg2') {
            this.vehImg2 = value;
        } 
        if (fieldName === 'vehImg3') {
            this.vehImg3 = value;
        }
        if (fieldName === 'vehImg4') {
            this.vehImg4 = value;
        }
      
    }

    handleFieldChange4(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'ownerName') {
            this.ownerName = value;
        } 
        if (fieldName === 'ownerPhone') {
            this.ownerPhone = value;
        } 
        if (fieldName === 'ownerEmail') {
            this.ownerEmail = value;
        } 
       /* if (fieldName === 'owntype') {
            this.owntype = value;
        }*/
        if (fieldName === 'ownerAdhar') {
            this.ownerAdhar = value;
        }
        if (fieldName === 'owneraddress') {
            this.owneraddress = value;
        }
       /* if (fieldName === 'preOwner') {
            this.preOwner = value;
        } 
        if (fieldName === 'vehInsurance') {
            this.vehInsurance = event.target.checked;
        } 
         if (fieldName === 'vehRTA') {
            this.vehRTA = event.target.checked;
        } 
        if (fieldName === 'vehBank') {
            this.vehBank = event.target.checked;
        } */
    }

    handleFieldChange6(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'serviceActive') {
            this.serviceActive = value;
        } 
        if (fieldName === 'serviceLD') {
            this.serviceLD = value;
        } 
        if (fieldName === 'serviceND') {
            this.serviceND = value;
        }
        if (fieldName === 'oemService') {
            this.oemService =  event.target.checked;
        } 
    }

    handleFieldChange7(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'subCount') {
            this.subCount = value;
        } 
        if (fieldName === 'warrantyCount') {
            this.warrantyCount = value;
        } 
        if (fieldName === 'warStrartDate') {
            this.warStrartDate = value;
        } 
        if (fieldName === 'warEndDate') {
            this.warEndDate = value;
        }
    }

    handleOnStepClick(event) {
        this.currentStep = event.target.value;
    }
    get isStepOne() {
        return this.currentStep === "1";
    }
 
    get isStepTwo() {
        return this.currentStep === "2";
    }
 
    get isStepThree() {
        return this.currentStep === "3";
    }

    get isStepFour() {
        return this.currentStep === "4";
    }

    get isStepFive() {
        return this.currentStep === "5";
    }

    get isStepSix() {
        return this.currentStep === "6";
    }
    get isStepSeven() {
        return this.currentStep === "7";
    }
    get isEnableNext() {
        return this.currentStep != "7";
    }
 
    get isEnablePrev() {
        return this.currentStep != "1";
    }
 
    get isEnableFinish() {
        return this.currentStep === "7";
    }

   
 
    
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: model})
    typePicklistValues1({error, data}) {
        if(data) 
           // this.options2 = data.values;
            if (data) this.slaFieldData = data;
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: brand})
    typePicklistValues({error, data}) {
        if(data) 
            this.options1 = data.values;
        
    }

    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: bodytype})
    typePicklistValues2({error, data}) {
        if(data) {
            this.options3 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: color})
    typePicklistValues3({error, data}) {
        if(data) {
            this.options4 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Vehiclecapacity})
    typePicklistValues4({error, data}) {
        if(data) {
            this.options5 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: transmissionType})
    typePicklistValues5({error, data}) {
        if(data) {
            this.options6 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: vehicleAge})
    typePicklistValues6({error, data}) {
        if(data) {
            this.options7 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Fuel_Type})
    typePicklistValues8({error, data}) {
        if(data) {
            this.options9 = data.values;
        }
    }
    
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Battery_Type})
    typePicklistValues10({error, data}) {
        if(data) {
            this.options11 = data.values;
        }
    }
    
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Make_Year})
    typePicklistValues12({error, data}) {
        if(data) {
            this.options13 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: AM_No_of_Pre_Owner})
    typePicklistValues13({error, data}) {
        if(data) {
            this.options14 = data.values;
        }
    }
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Vehicle_Owner_Type})
    typePicklistValues14({error, data}) {
        if(data) {
            this.options15 = data.values;
        }
    }
   
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: AM_Odometer_Status})
    typePicklistValues15({error, data}) {
        if(data) {
            this.options16 = data.values;
        }
    }
    
    @wire(getObjectInfo, { objectApiName: vehical_detail_obj })
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: fundedFrom})
    typePicklistValues17({error, data}) {
        if(data) {
            this.options18 = data.values;
        }
    }
    handleNext(){
        if(this.currentStep === "1"){
            this.handleSave();
            this.currentStep = "2";
        }
        else if(this.currentStep === "2"){
            this.handleUpdate2();
            this.currentStep = "3";
        }
        else if(this.currentStep === "3"){
            this.handleUpdate3();
            this.currentStep = "4";
        }
        else if(this.currentStep === "4"){
            this.handleUpdate4();
            this.currentStep = "5";
        }
        else if(this.currentStep === "5"){
            
            this.currentStep = "6";
        }
        else if(this.currentStep === "6")
        {
            this.handleUpdate6();
            this.currentStep = "7";
        }
        
    }
 
    handlePrev(){
       
        if(this.currentStep == "7")
        {
            this.currentStep = "6";
        }
        else
        if(this.currentStep == "6")
        {
            this.currentStep = "5";
        }
        else
        if(this.currentStep == "5")
        {
            this.currentStep = "4";
        }
        else if(this.currentStep == "4")
        {
            this.currentStep = "3";
        }
        else if(this.currentStep == "3")
        {
            this.currentStep = "2";
        }
        else if(this.currentStep == "2")
        {
            this.currentStep = "1";
        }
    }

 
    handleFinish()
    {
        this.handleUpdate7();
    }

   

handleSave() 
{
        console.log('Hello');
        console.log(this.vehResNum);
        console.log(this.vehBrand);
        console.log(this.vehModel);
        console.log(this.fueltype);
        console.log(this.vehColor);
        console.log(this.vehTranType);
        console.log(this.vehAge);
        console.log(this.makeYear);
        console.log(this.vehRepairReq);
        console.log(this.vehLoan);
        console.log(this.purAmt);
        console.log(this.purDate);
        console.log(this.fundfrom);
        console.log(this.profit);
        console.log(this.vehVariant);
        console.log(this.vehRegDate);
        console.log(this.vehRenew);
        console.log(this.vehRegDate);
        console.log(this.odoStatus);
        console.log(this.fuelPrice);
        console.log(this.kms);
        console.log(this.kiloWatt);
    
    insertVehicleInformation({ 
        vehName: this.vehResNum,
        vehBrand:this.vehBrand,
        vehModel:this.vehModel,
        vehFuel:this.fueltype,
        vehColor:this.vehColor,
        vehTrans:this.vehTranType,
        vehAge:this.vehAge,
        vehMake:this.makeYear,
        vehRepair:this.vehRepairReq,
        vehLoan:this.vehLoan,
        vehPurAmt:this.purAmt,
        vehPurDate:this.purDate,
        vehFunded:this.fundfrom,
        vehProfit:this.profit,
        vehVariant:this.vehVariant,
        vehRegDate: this.vehRegDate,
        vehRenew :this.vehRenew,
        odoStatus:this.odoStatus,
        fuelPrice: this.fuelPrice,
        vehKms: this.kms,
        kiloWatt:this.kiloWatt,
        
    })
    .then(result => {
       // alert(result);
        this.recordId = result;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Successfully created vehicle Information',
                variant: 'success'
            })
        );
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

handleUpdate2() 
{
    console.log('Hello');
    console.log(this.recordId);
    console.log(this.vehBody);
    console.log(this.vehCap);
    console.log(this.fueltank);
    console.log(this.batterytype);
    console.log(this.engineCap);
    console.log(this.engNum);
    console.log(this.chsNum);
    console.log(this.owntype);
    console.log(this.preOwner);
    console.log(this.vehInsurance);
    console.log(this.vehRTA);
    console.log(this.vehBank);

    updateVehicleDetails({
        productId: this.recordId,
        vehBody: this.vehBody,
        vehCapa: this.vehCap,
        vehFuelTank: this.fueltank,
        vehBattType: this.batterytype,
        vehEngCapacity: this.engineCap,
        engNum: this.engNum,
        chsNum:this.chsNum,
        vehOwnType:this.owntype,
        preOwner: this.preOwner,
        vehInsurance:this.vehInsurance,
        vehRTA:this.vehRTA,
        vehBank:this.vehBank
       
    })
    .then(() => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Successfully updated vehicle  Details',
                variant: 'success'
            })
        );
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error in updating vehicle  Details: ' + error.body.message,
                variant: 'error'
            })
        );
    });
}
handleUpdate3() 
{
 
uploadVehicleImages({
    productId: this.recordId,
    vehImg1: this.vehImg1,
    vehImg2:this.vehImg2,
    vehImg3:this.vehImg3,
    vehImg4: this.vehImg4,
    vehmain:this.vehmain
})
.then(() => {
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Successfully upload vehicle images',
            variant: 'success'
        })
    );
})
.catch(error => {
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error',
            message: 'Error in  uploading vehicle Images: ' + error.body.message,
            variant: 'error'
        })
    );
});
   
}
    
    handleUpdate4() 
    {
        console.log('Hello');
        console.log(this.recordId);
        console.log(this.ownerName);
        console.log(this.ownerPhone);
        console.log(this.ownerEmail);
        console.log(this.owneraddress);
        console.log(this.ownerAdhar);
       
        
        updateOwnerDetails({ 
            productId: this.recordId,
            ownerName: this.ownerName, 
            ownerPhone: this.ownerPhone,
            ownerEmail: this.ownerEmail,
            owneraddress : this.owneraddress,
            ownerAdhar : this.ownerAdhar
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated vehicle detail',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in  updating vehicle detail entry: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
    }

    handleUpdate6() 
    {
        console.log('Hello');
        console.log(this.recordId);
        console.log(this.serviceActive);
        console.log(this.oemService);
        console.log(this.serviceLD);
        console.log(this.serviceND);
     
        updateServicingDetails({ 
            productId: this.recordId,
            serActive:this.serviceActive, 
            serOEM:this.oemService, 
            serLastDate:this.serviceLD, 
            serNextDate:this.serviceND
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated Servicing details',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in  updating Servicing details: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    @track vehRepairId;

    handleUpdate7() 
    {
        console.log('Hello');
        console.log(this.recordId);
        console.log(this.subCount);
        console.log(this.warrantyCount);
        console.log(this.warStrartDate);
        console.log(this.warEndDate);
        
        updateSubWarranty({ 
            productId: this.recordId,
            subCount:this.subCount, 
            subWarranty:this.warrantyCount, 
            subStartDate:this.warStrartDate, 
            subEndDate:this.warEndDate
   
        })
        .then(result => {
            this.vehRepairId = result;
           
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated subscription and warranty details',
                    variant: 'success'
                })
            );
           // alert(this.vehRepairId );
            if (this.vehRepairId && this.vehRepairReq) {
                let compDefinition = {
                    componentDef: "c:multiplerepairs",
                    attributes: {
                        repairId:this.vehRepairId
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
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in  updating subscription and warranty details: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
       
    }
    goToVehicleMainScreen(event)
    {
        let compDefinition = {
            componentDef: "c:amVehicleMainCmp",
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
  
    
    handlelink(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
            url: 'https://ashokamotors.imgbb.com/'
            }
            });

    }

    acceptedFormats = '.jpg, .jpeg, .png'; 
    file;
    handleFileChange(event) {
        this.file = event.target.files[0];
    }

    uploadFile() 
    {
        if (this.file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileContents = reader.result.split(',')[1];
                const fileName = this.file.name;
                const contentType = this.file.type;

                uploadAttachment({productId: this.recordId, fileName, fileContents, contentType })
                    .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully document is Uplaoded',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in document uploading: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
            };
            reader.readAsDataURL(this.file);
        }
    }

}