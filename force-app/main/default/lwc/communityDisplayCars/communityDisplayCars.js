import { LightningElement, wire, api, track } from 'lwc';
import getallvehciles1 from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails1';
import getvehicledetails from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails';

import renault from '@salesforce/resourceUrl/RenaultN';
import audi from '@salesforce/resourceUrl/AudiNew';
import honda from '@salesforce/resourceUrl/HondaNew';
import toyota from '@salesforce/resourceUrl/ToyotaNew';
import mahindra from '@salesforce/resourceUrl/MahindraNew';
import bmw from '@salesforce/resourceUrl/BMWNew';
import marutisuzuki from '@salesforce/resourceUrl/MarutiSuzukilogo';
import tata from '@salesforce/resourceUrl/TataN';
import kia from '@salesforce/resourceUrl/KIANew';
import volswagen from '@salesforce/resourceUrl/VolkswagenNew';
import ford from '@salesforce/resourceUrl/FordNew';
import hyundai from '@salesforce/resourceUrl/HyundaiNew';
import merecdes from '@salesforce/resourceUrl/MercedesBenzNew';

import carouselcars from '@salesforce/resourceUrl/carouselcars'
import getImages from '@salesforce/apex/CarouselImages.getImages';
import {loadStyle} from 'lightning/platformResourceLoader' ;

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import vechile from '@salesforce/schema/Product2';
import year from '@salesforce/schema/Product2.AM_Make_Year__c';
import kmsdriven from '@salesforce/schema/Product2.KMS_Travelled__c';
import fueltype from '@salesforce/schema/Product2.AM_Fuel_Type__c';
import bodytype from '@salesforce/schema/Product2.AM_Body_Type__c';
import transmission from '@salesforce/schema/Product2.AM_Transmission_Type__c';
import { NavigationMixin } from 'lightning/navigation';

export default class CommunityDisplayCars extends NavigationMixin(LightningElement) {
  @api customerid;
  @track customerdata;
  @track DisplayCars=true;
  @track ShowCarousal=false;
  Renault=renault;
  Audi=audi;
  HONDA=honda;
  Toyota=toyota;
  Mahindra=mahindra;
  BMW=bmw;
  MarutiSuzuki=marutisuzuki;
  Tata=tata;
  Kia=kia;
  Volkswagen=volswagen;
  Ford=ford;
  Hyundai=hyundai;

 
  @api records = [];
  @api recordId;
  @api errors;
  @api recordId1;
  
  
@track recordId1;
  @track colorss;
  @track searchmakeyear = '';
  @track searchkmsdriven = '';
  @track searchfueltype = '';
  @track searchbodytype = '';
  @track searchtransmissiontype = '';
  @track searchbrand = '';
  @track searchcolor = '';
  @track kmtravveled= '';
  @track isActive = false;
  @track vehid;
  @track customerName;
  @track customerEmail;
  @track customerPhone;
  @track date;
  


  
  @track yearoptions = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo1;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo1.data.defaultRecordTypeId', fieldApiName: year })
  typePicklistValues1({ error, data }) {
    if (data) {
      this.yearoptions = data.values;
    }

  }
  
  @track fueloptions = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo3;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo3.data.defaultRecordTypeId', fieldApiName: fueltype })
  typePicklistValues3({ error, data }) {
    if (data) {
      this.fueloptions = data.values;
    }

  }
  @track bodytypeoptins = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo4;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo4.data.defaultRecordTypeId', fieldApiName: bodytype })
  typePicklistValues4({ error, data }) {
    if (data) {
      this.bodytypeoptins = data.values;
    }

  }
  @track tranmissionoptions = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo5;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo5.data.defaultRecordTypeId', fieldApiName: transmission })
  typePicklistValues5({ error, data }) {
    if (data) {
      this.tranmissionoptions = data.values;
    }

  }
  handleKeymakeyear(event)
   {
    this.searchmakeyear = event.target.value;
  }
  handlekmsdrive(event) 
  {
    this.searchkmsdriven = event.target.value;
  }
  handlefueltype(event) 
  {
    this.searchfueltype = event.target.value;
  }
  handlebodytype(event) 
  {
    this.searchbodytype = event.target.value;
  }
  handletransmissiontype(event)
  {
    this.searchtransmissiontype = event.target.value;
  }
 
  handlebrand(event) 
  {
    this.searchbrand = event.target.value;
  }
  
  clearfilters()
  {
    this.connectedCallback();
  }

  handlesearch() 
  {
    this.isActive = false;
    getallvehciles1({
      makeyear: this.searchmakeyear, fueltype: this.searchfueltype, bodytype: this.searchbodytype, transmission: this.searchtransmissiontype,
      brand: this.searchbrand, color: this.searchcolor, kms :this.kmtravveled
    })
    .then(result => {
      this.records = result.map(record => {
        let isSelectedUrl = '';
    
        if (record.AM_Brand__c === 'Mahindra') {
          isSelectedUrl = mahindra;
        } 
        else if (record.AM_Brand__c === 'Tata') {
          isSelectedUrl = tata;
        }
        else if (record.AM_Brand__c === 'Maruti Suzuki') {
          isSelectedUrl = marutisuzuki;
        }
        else if (record.AM_Brand__c === 'Hyundai') {
          isSelectedUrl = hyundai;
        }
        else if (record.AM_Brand__c === 'BMW') {
          isSelectedUrl = bmw;
        }
        else if (record.AM_Brand__c === 'Kia') {
          isSelectedUrl = kia;
        }
        else if (record.AM_Brand__c === 'Audi') {
          isSelectedUrl = audi;
        }
        else if (record.AM_Brand__c === 'Ford') {
          isSelectedUrl = ford;
        }
        else if (record.AM_Brand__c === 'Volkswagen') 
        {
          isSelectedUrl = volswagen;
        }

        else if (record.AM_Brand__c === 'Renault') 
        {
          isSelectedUrl = renault;
        }
        else if (record.AM_Brand__c === 'Mercedes-Benz') 
        {
          isSelectedUrl = merecdes;
        }
        else if (record.AM_Brand__c === 'Honda') {
          isSelectedUrl = honda;
        }

        return {
          ...record,
          isSelected: isSelectedUrl,
        };
      });
    })
    .catch(error => {
      this.errors = error;
    });
    
  }
  get vehcilekms()
    {
      return [
          {label:'10000-20000',value:'10000-20000'},
          {label:'20000-30000',value:'20000-30000'},
          {label:'30000-40000',value:'30000-40000'},
          {label:'40000-50000',value:'40000-50000'},
          {label:'50000-60000',value:'50000-60000'},
          {label:'60000-70000',value:'60000-70000'},
          {label:'70000-80000',value:'70000-80000'},
          {label:'80000-90000',value:'80000-90000'},
          {label:'90000-100000',value:'90000-100000'},
             ] 
  };
  handlesearchkmstraveld(event)
  {
    this.kmtravveled= event.target.value;
  }

  connectedCallback()
  {
    getvehicledetails({})
    .then(result => {
      this.records = result.map(record => {
        let isSelectedUrl = '';
    
        if (record.AM_Brand__c === 'Mahindra') {
          isSelectedUrl = mahindra;
        } 
        else if (record.AM_Brand__c === 'Tata') {
          isSelectedUrl = tata;
        }
        else if (record.AM_Brand__c === 'Maruti Suzuki') {
          isSelectedUrl = marutisuzuki;
        }
        else if (record.AM_Brand__c === 'Hyundai') {
          isSelectedUrl = hyundai;
        }
        else if (record.AM_Brand__c === 'BMW') {
          isSelectedUrl = bmw;
        }
        else if (record.AM_Brand__c === 'Kia') {
          isSelectedUrl = kia;
        }
        else if (record.AM_Brand__c === 'Audi') {
          isSelectedUrl = audi;
        }
        else if (record.AM_Brand__c === 'Ford') {
          isSelectedUrl = ford;
        }
        else if (record.AM_Brand__c === 'Volkswagen') 
        {
          isSelectedUrl = volswagen;
        }

        else if (record.AM_Brand__c === 'Renault') 
        {
          isSelectedUrl = renault;
        }
        else if (record.AM_Brand__c === 'Mercedes-Benz') 
        {
          isSelectedUrl = merecdes;
        }
        else if (record.AM_Brand__c === 'Honda') {
          isSelectedUrl = honda;
        }

        return {
          ...record,
          isSelected: isSelectedUrl,
        };
      });
    })
    .catch(error => {
      this.errors = error;
    });
  }
  selectedColor(event) 
  {
  
    const selectedSwatch = event.target.closest('.slds-color-picker__swatch');
    if (selectedSwatch) 
    {
      this.searchcolor = selectedSwatch.dataset.color;
        alert(this.searchcolor);
        console.log('Selected color:', color);
        // Perform any other actions with the selected color
    }
  }

  selectedCar(event) 
  {
    let img = event.target;
    let value = img.getAttribute('alt');
   
    this.searchbrand = value;
  }

//Display Of Carousal..
@track imageRecords;
@track imageName;

isCssLoaded = false;

handlecorousalnav(event) 
{
  this.recordId1 = event.target.value;
  this.ShowCarousal=true;
  this.DisplayCars=false;

  getImages({vid:this.recordId1})
  .then(result => {
    if (result && result.length > 0) 
    {
      const imageRecord = result[0];
      // create an array of image URLs from the image record fields
      const imageUrls = [
        imageRecord.AM_Vehicle_Main_Image__c,
        imageRecord.AM_Vehicle_Exterior_Image_1__c,
        imageRecord.AM_Vehicle_Exterior_Image_2__c,
        imageRecord.AM_Vehicle_Interior_Image_1__c,
        imageRecord.AM_Vehicle_Interior_Image_2__c
      ];
      const imagemodels = [
        imageRecord.AM_Vehicle__r.AM_Vehicle_Model__c,
      ];
      const imageyears = [
        imageRecord.AM_Vehicle__r.AM_Make_Year__c,
      ];
      const imagebrand = [
        imageRecord.AM_Vehicle__r.AM_Brand__c,
      ];
      const imageprice = [
        imageRecord.AM_Vehicle__r.AM_Customer_Selling_Price__c,
      ];
      const imagevariant = [
        imageRecord.AM_Vehicle__r.AM_Variant__c,
      ];
      const imagestatus = [
        imageRecord.AM_Vehicle__r.AM_Vehicle_Status__c,
      ];
      const imagetypecar = [
        imageRecord.AM_Vehicle__r.AM_Vehicle_Owner_Type__c,
      ];
      const imagefueltype = [
        imageRecord.AM_Vehicle__r.AM_Fuel_Type__c,
      ];
      const imagetranstype = [
        imageRecord.AM_Vehicle__r.AM_Transmission_Type__c,
      ];
      const imagekmsdriven = [
        imageRecord.AM_Vehicle__r.KMS_Travelled__c,
      ];
      const imagevehcapacity = [
        imageRecord.AM_Vehicle__r.AM_Vehicle_Capacity__c,
      ];

      // assign the array of image URLs to a component property
      this.imageRecords = imageUrls;
      this.imageModel = imagemodels;
      this.imageMake = imageyears;
      this.imageBrand = imagebrand;
      this.imagePrice = imageprice;
      this.imageVariant = imagevariant;
      this.imageStatus = imagestatus;
      this.imageTypeCar = imagetypecar;
      this.imageFuelType = imagefueltype;
      this.imageTransType = imagetranstype;
      this.imageKmsDriven = imagekmsdriven;
      this.imageVehCapacity = imagevehcapacity;

      // Additional processing or logic you may want to perform
      // after retrieving and assigning the image data.
    } else {
      console.error('No image data found.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


CallMain()
{
  this.ShowCarousal=false;
  this.DisplayCars=true;
}


renderedCallback()
{ 
if(this.isCssLoaded) return
this.isCssLoaded = true
loadStyle(this, carouselcars).then(()=>{
  console.log("Loaded Successfully")
}).catch(error=>{ 
  console.error("Error in loading the colors")
})
}


}