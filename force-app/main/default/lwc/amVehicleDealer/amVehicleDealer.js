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
import Battery_Type from '@salesforce/schema/Product2.AM_Battery_Type__c';
import Make_Year from '@salesforce/schema/Product2.AM_Make_Year__c';
import fundedFrom from '@salesforce/schema/Product2.AM_Purchase_Funded_From__c';
import Vehicle_Owner_Type from '@salesforce/schema/Product2.AM_Vehicle_Owner_Type__c';
import AM_Odometer_Status from '@salesforce/schema/Product2.AM_Odometer_Status__c';

import insertVehicleInformation from '@salesforce/apex/AmVehicleDealerController.insertVehicleInformation'; 
import updateVehicleDetails from '@salesforce/apex/AmVehicleDealerController.updateVehicleDetails'; 
import uploadVehicleImages from '@salesforce/apex/AmVehicleDealerController.uploadVehicleImages'; 
import updateServicingDetails from '@salesforce/apex/AmVehicleDealerController.updateServicingDetails'; 
import updateSubWarranty from '@salesforce/apex/AmVehicleDealerController.updateSubWarrantyDetails';
import updateDealerDetails from '@salesforce/apex/AmVehicleDealerController.updateDealerDetails';

import searchDealerAccount from '@salesforce/apex/AmVehicleDealerController.searchDealerAccount'; 
import uploadAttachment from '@salesforce/apex/AmVehicleDealerController.uploadAttachment';

import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';



export default class AmVehicleDealer extends  NavigationMixin(LightningElement) 

{
    @track showKilowattField=false;
    @track currentStep = '1';
    @track options1 = [];
    @track options2 = [];
    @track options3 = [];
    @track options4 = [];
    @track options5 = [];
    @track options6 = [];
    @track options7 = [];
    @track options9 = [];
    @track options11 = [];
    @track options13 = [];
    @track options14 = [];
    @track options15 = [];
    @track options16 = [];
    @track options18 = [];
   

    @track recordId;

    @track vehBrand='';
    @track vehModel='';
    @track vehResNum='';
    @track fueltype='';
    @track vehColor='';
    @track vehTranType='';
    @track vehAge='';
    @track makeYear='';
    @track vehLoan='';
    @track fundfrom='';
    @track purDate='';
    @track profit='';
    @track vehDealAmt='';
    @track vehVariant='';
    @track vehRegDate='';
    @track vehRenew='';
    @track odoStatus='';
    @track kiloWatt='';
    //@track fuelPrice='';

    @track vehBody='';
    @track vehCap='';
    @track AccTime='';
    @track kms='';
    @track batterytype='';
    @track fueltank='';
    @track engineCap='';
    @track engNum='';
    @track chsNum='';
    @track owntype='';
    @track preOwner='';
    @track vehInsurance='';
    @track vehRTA='';
    @track vehBank='';

    @track dealName='';
    @track dealPhone='';
    @track dealEmail='';
    @track ownerName='';
    @track ownerPhone='';
    @track ownerEmail='';
    
   
  
   
     @track owneraddress='';
    @track ownerAdhar='';


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


    @track phonenum='';
    @track data=[];
    @track records=[];
    @track dealerName='';
    @track dealerPhone='';
    @track dealerEmail='';
    

    connectedCallback() 
    {
      loadStyle(this, noHeader)
    }

    handleDealer(event)
    {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'phonenum') 
        {
            this.phonenum = value;
        } 
        
    }
    handleDealerNameInformation(event)
    {
        this.dealerName=event.target.value;
    }
    handleDealerPhoneInformation(event)
    {
        this.dealerPhone=event.target.value;
    }
    handleDealerEmailInformation(event)
    {
        this.dealerEmail=event.target.value;
    }

    @track accountName;  
    @track accountRecordId;  
 
    onAccountSelection(event){  
    this.accountName = event.detail.selectedValue;  
    this.accountRecordId = event.detail.selectedRecordId;  
    }
    //Dealer Base
    handleSearch()
    {
        searchDealerAccount({
        cmpName:this.accountName
           
        })
        .then(result => 
            {
             this.handleDealerUpdate4();
             this.data=result;
            //  this.records= this.data;
            //  this.dealerName = this.records[0].Name;
           //   this.dealerPhone = this.records[0].Phone;
            //  this.dealerEmail = this.records[0].Email__c;
             })
        .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error in finding Dealer: ' + error.body.message,
                        variant: 'error'
                    })
                );
        });
    }
   
    handlebrandChange(event) 
    {
        let key = this.slaFieldData.controllerValues[event.target.value];
        this.options2 = this.slaFieldData.values.filter(opt => opt.validFor.includes(key));

        const fieldName = event.target.name;
        const value = event.target.value;
        if (fieldName === 'vehBrand') 
        {
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
       
        if (fieldName === 'vehResNum') 
        {
            this.vehResNum = value;
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
        if (fieldName === 'vehColor') 
        {
            this.vehColor = value;
        } 
        if (fieldName === 'vehTranType') {
            this.vehTranType = value;
        } 
        if (fieldName === 'vehAge') {
            this.vehAge = value;
        } 
         if (fieldName === 'makeYear') {
            this.makeYear = value;
        } 
         if (fieldName === 'fundfrom') {
            this.fundfrom = value;
        } 
         if (fieldName === 'purDate') {
            this.purDate = value;
        } 
        if (fieldName === 'profit') {
            this.profit = value;
        } 
         if (fieldName === 'vehDealAmt') {
            this.vehDealAmt = value;
        } 
        if (fieldName === 'vehVariant') {
            this.vehVariant = value;
        }
        if (fieldName === 'vehRegDate') {
            this.vehRegDate = value;
        }
        if (fieldName === 'odoStatus') {
            this.odoStatus = value;
        }
        if (fieldName === 'kms') {
            this.kms = value;
        }
        if (fieldName === 'vehLoan') 
        {
            this.vehLoan = event.target.checked;
           // console.log(this.vehLoan);
        } 
        if (fieldName === 'vehRenew') 
        {
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


    handleFieldChange3(event) 
    {
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
       
        
       /*
        if (fieldName === 'owntype') {
            this.owntype = value;
        }*/
        if (fieldName === 'owneraddress') {
            this.owneraddress = value;
        }
        if (fieldName === 'ownerAdhar') {
            this.ownerAdhar = value;
        }
    }

    handleFieldChange4(event) 
    {
        const fieldName = event.target.name;
        const value = event.target.value;
        if (fieldName === 'vehmain') 
        {
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


    handleFieldChange6(event) 
    {
        const fieldName = event.target.name;
        const value = event.target.value;
       
        if (fieldName === 'serviceActive') 
        {
            this.serviceActive = value;
            console.log(this.serviceActive);
        } 
        if (fieldName === 'oemService') 
        {
            this.oemService =  event.target.checked;
            console.log(this.oemService);
        } 
        if (fieldName === 'serviceLD') 
        {
            this.serviceLD = value;
            console.log(this.serviceLD);
        } 
        if (fieldName === 'serviceND') 
        {
            this.serviceND = value;
            console.log(this.serviceND);
        }
    }

    handleFieldChange7(event) 
    {
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

    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg'];
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
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: model})
    typePicklistValues1({error, data}) {
        if(data) 
           // this.options2 = data.values;
            if (data) this.slaFieldData = data;
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

    
    handleNext()
    {
        if(this.currentStep === "1")
        {
            this.handleSave();
            this.currentStep = "2";
        }
        else if(this.currentStep === "2")
        {
            this.handleUpdate2();
            this.currentStep = "3";
        }
        else if(this.currentStep === "3")
        {
            this.handleUpdate3();
            this.currentStep = "4";
        }
        else if(this.currentStep === "4"){
            
            this.handleSearch();
            this.currentStep = "5";
        }
        else if(this.currentStep === "5")
        {
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
        if(this.currentStep == "6"){
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
        console.log(this.vehResNum);
        console.log(this.vehBrand);
        console.log(this.vehModel);
        console.log(this.fueltype);
        console.log(this.vehColor);
        console.log(this.vehTranType);
        console.log(this.vehAge);
        console.log(this.makeYear);
        console.log(this.vehDealAmt);
        console.log(this.purDate);
        console.log(this.fundfrom);
        console.log(this.profit);
        console.log(this.vehVariant);
        console.log(this.vehRegDate);
        console.log(this.odoStatus);
        console.log(this.kms);
        console.log(this.kiloWatt);
        console.log(this.vehLoan);
        console.log(this.vehRenew);

    insertVehicleInformation({ 
        vehName:this.vehResNum,
        vehBrand:this.vehBrand,
        vehModel:this.vehModel,
        vehFuel:this.fueltype,
        vehColor:this.vehColor,
        vehTrans:this.vehTranType,
        vehAge:this.vehAge,
        vehMake:this.makeYear,
        vehDealAmt:this.vehDealAmt,
        vehPurDate:this.purDate,
        vehFunded:this.fundfrom,
        vehProfit:this.profit,
        vehVariant:this.vehVariant,
        vehRegDate: this.vehRegDate,
        odoStatus:this.odoStatus,
        vehKms: this.kms,
        kiloWatt:this.kiloWatt,
        vehLoan:this.vehLoan,
        vehRenew:this.vehRenew
    })
    .then(result => {
       
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
    console.log(this.recordId);
    console.log(this.vehBody);
    console.log(this.vehCap);
    console.log(this.fueltank);
    console.log(this.batterytype);
    console.log(this.engineCap);
    console.log(this.engNum);
    console.log(this.chsNum);

    console.log(this.preOwner);
    console.log(this.owntype);
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
    vehmain:this.vehmain,
    vehImg1: this.vehImg1,
    vehImg2:this.vehImg2,
    vehImg3:this.vehImg3,
    vehImg4: this.vehImg4
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

handleDealerUpdate4()
{
 
        console.log(this.recordId);
        console.log(this.ownerName);
        console.log(this.ownerPhone);
        console.log(this.ownerEmail);
        console.log(this.owneraddress);
        console.log(this.ownerAdhar);
        /*
        ownerName: this.ownerName, 
        ownerPhone: this.ownerPhone,
        ownerEmail: this.ownerEmail,
        owneraddress : this.owneraddress,
        ownerAdhar : this.ownerAdhar
        */
        
    updateDealerDetails({
        productId: this.recordId,
        accName:this.accountRecordId
       
    })
    .then(() => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Successfully updated vehicle dealer detail',
                variant: 'success'
            })
        );
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error in  updating vehicle dealer detail entry: ' + error.body.message,
                variant: 'error'
            })
        );
    });
}

   


    handleUpdate6() 
    {
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
    }

    handleUpdate7() {
        
        updateSubWarranty({ 
            productId: this.recordId,
            subCount:this.subCount, 
            subWarranty:this.warrantyCount, 
            subStartDate:this.warStrartDate, 
            subEndDate:this.warEndDate
   
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully updated subscription and warranty details',
                    variant: 'success'
                })
            );
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

    CallVehicleEntry(event)
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

    acceptedFormats = '.jpg, .jpeg, .png'; 
      file;

    handleFileChange(event)
	{
        this.file= event.target.files[0];
    }

    uploadFile()
    {
    if (this.file)
		{
			const reader = new FileReader();
            reader.onloadend = () => {
                const fileContents = reader.result.split(',')[1];
                const fileName = this.file.name;
                const contentType = this.file.type;
                uploadAttachment({productId: this.recordId, fileName, fileContents, contentType})
                .then(() => {
					this.dispatchEvent(
						new ShowToastEvent({
								title: 'Success',
								message: 'Successfully document is Uploaded',
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


    handlelink(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
            url: 'https://ashokamotors.imgbb.com/'
            }
            });

    }
}