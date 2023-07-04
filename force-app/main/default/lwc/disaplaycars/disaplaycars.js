import { LightningElement, wire, api, track } from 'lwc';
import getallvehciles1 from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails1';
import getallpreferedvehcls from '@salesforce/apex/getsearchfilterdatacontroller.getpreferedvehciles';
import getdata from '@salesforce/apex/getsearchfilterdatacontroller.getdata';

import noHeader from '@salesforce/resourceUrl/NoHeader';

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

import { loadStyle } from "lightning/platformResourceLoader";
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import vechile from '@salesforce/schema/Product2';
import year from '@salesforce/schema/Product2.AM_Make_Year__c';
import kmsdriven from '@salesforce/schema/Product2.KMS_Travelled__c';
import fueltype from '@salesforce/schema/Product2.AM_Fuel_Type__c';
import bodytype from '@salesforce/schema/Product2.AM_Body_Type__c';
import transmission from '@salesforce/schema/Product2.AM_Transmission_Type__c';
import { NavigationMixin } from 'lightning/navigation';

export default class Testdependentpicklist extends NavigationMixin(LightningElement) {
  @api customerid;
  @track customerdata;
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

  @api selectedIds = [];
  @api selectedcars;
  @api records = [];
  @api recordId;
  @api errors;
  @api recordId1;
  @api recordId2;
  
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
  handlepreferences() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.handleprefrencesOn();
    } else {
      this.handleprefrencesOff();
    }
  }
  clearfilters()
  {
    this.searchmakeyear = '';
    this.searchfueltype = '';
    this.searchbodytype = '';
    this.searchtransmissiontype = '';
    this.searchbrand = '';
    this.searchcolor = '';
    this.kmtravveled = '';
    this.handlesearch();
    

  }

  handleprefrencesOn()
   {
   alert( this.customerid);
    getallpreferedvehcls({ custid: this.customerid })
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
        else if (record.AM_Brand__c === 'Volkswagen') {
          isSelectedUrl = volswagen;
        }

        else if (record.AM_Brand__c === 'Renault') {
          isSelectedUrl = renault;
        }
        else if (record.AM_Brand__c === 'Mercedes-Benz') {
          isSelectedUrl = merecdes;
        }
        else if (record.AM_Brand__c === 'Honda') {
          isSelectedUrl = honda;
        }


        
    
        return {
          ...record,
          isSelected: isSelectedUrl,
          isSelected1: this.selectedIds.includes(record.Id) ? true : false
          
        };
      });
    })
    .catch(error => {
      this.errors = error;
    });
  }

  handleprefrencesOff() {
    this.handlesearch();
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
        else if (record.AM_Brand__c === 'Volkswagen') {
          isSelectedUrl = volswagen;
        }

        else if (record.AM_Brand__c === 'Renault') {
          isSelectedUrl = renault;
        }
        else if (record.AM_Brand__c === 'Mercedes-Benz') {
          isSelectedUrl = merecdes;
        }
        else if (record.AM_Brand__c === 'Honda') {
          isSelectedUrl = honda;
        }

        return {
          ...record,
          isSelected: isSelectedUrl,
          isSelected1: this.selectedIds.includes(record.Id) ? true : false
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

  selectedCar(event) 
  {
    let img = event.target;
    let value = img.getAttribute('alt');
   
    this.searchbrand = value;
  }
  selectecar(event) 
  {
    this.recordId = event.target.value;
    this.selectedIds.push(this.recordId);
    this.handlesearch();
  }
  
  removeselectcar(event)
  {
    
    this.recordId2 = event.target.value;
    if (this.selectedIds.includes(this.recordId2)) 
    {
      this.selectedIds = this.selectedIds.filter(value => value !== this.recordId2);
    }
    this.handlesearch();

  }
 
  
  handlecorousalnav(event) 
  {
    
    for (const value of this.selectedIds)
     {
      alert(value);
    }
    this.recordId1 = event.target.value; 
    
   
    let compDefinition = {
      componentDef: "c:Carouselcars",
      attributes: 
	  {
        vehid: this.recordId1,
        customerid: this.customerid,
        selectedIds:this.selectedIds
      }
    };
 
    let encodedCompDef = btoa(JSON.stringify(compDefinition));
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedCompDef
      }
    });
  }

  selectedcarNavigation() 
  {
    console.log(this.customerid);
    for (const value of this.selectedIds)
     {
      alert(value);
    }
    let compDefinition = {
      componentDef: "c:amSelectedVehicles",
      attributes: {
        selectedCars1: this.selectedIds,
        customerid: this.customerid
      }
    };
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
    

    getdata({accid :this.customerid}) 
    .then(result=>{
        this.data=result;
        this.customerName = this.data.Name;
        this.customerEmail = this.data.Email__c;
        this.customerPhone = this.data.Phone;
       
    })
    .catch(error=>{
        this.error=error;
    })
    loadStyle(this, noHeader);
    this.handleprefrencesOff();
  }
  selectedColor(event) {
  
    const selectedSwatch = event.target.closest('.slds-color-picker__swatch');
    if (selectedSwatch) {
      this.searchcolor = selectedSwatch.dataset.color;
        alert(this.searchcolor);
        console.log('Selected color:', color);
        // Perform any other actions with the selected color
    }
}
}