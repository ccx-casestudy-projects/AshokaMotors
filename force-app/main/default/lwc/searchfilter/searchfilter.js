import { LightningElement ,track,wire,api} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getallvehciles from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails';
import getallvehciles1 from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails1';
import vechile from '@salesforce/schema/Product2';
import year from '@salesforce/schema/Product2.AM_Make_Year__c';
import kmsdriven from '@salesforce/schema/Product2.KMS_Travelled__c';
import fueltype from '@salesforce/schema/Product2.AM_Fuel_Type__c';
import bodytype from '@salesforce/schema/Product2.AM_Body_Type__c';
import transmission from '@salesforce/schema/Product2.AM_Transmission_Type__c';

export default class Searchfilter extends LightningElement {
  @track error;
   @track records;
    @api record;
    @track colorss;
    @track searchmakeyear='';
    @track searchkmsdriven='';
    @track searchfueltype='';
    @track searchbodytype='';
    @track searchtransmissiontype='';
    @track searchbrand='';
    @track searchcolor='';


   
   
    @wire(getallvehciles)
    wiredvehicle({ error, data }) {
      if (data) {
        this.records = data;
        this.initialrecords = this.records;
        this.error = undefined;
      } else if (error) {
        this.error = error;
      
      }
    }
    selectedCar(event) {
      let img = event.target;
      let value = img.getAttribute('alt');
      
      this.searchbrand=value;
    }
    selectedColor(event){
  
      this.colorss=event.target.style;
      this.searchcolor=this.colorss.background;
      alert(this.searchcolor);
    
    }
    @track options1 = [];
    @wire(getObjectInfo, { objectApiName: vechile })
    objectInfo1;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo1.data.defaultRecordTypeId', fieldApiName: year})
    typePicklistValues1({error, data}) {
        if(data) {
            this.options1 = data.values;
        }

    }
    @track options2 = [];
    @wire(getObjectInfo, { objectApiName: vechile })
    objectInfo2;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo2.data.defaultRecordTypeId', fieldApiName: kmsdriven})
    typePicklistValues2({error, data}) {
        if(data) {
            this.options2 = data.values;
        }

    }
    @track options3 = [];
    @wire(getObjectInfo, { objectApiName: vechile })
    objectInfo3;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo3.data.defaultRecordTypeId', fieldApiName: fueltype})
    typePicklistValues3({error, data}) {
        if(data) {
            this.options3 = data.values;
        }

    }
    @track options4 = [];
    @wire(getObjectInfo, { objectApiName: vechile })
    objectInfo4;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo4.data.defaultRecordTypeId', fieldApiName: bodytype})
    typePicklistValues4({error, data}) {
        if(data) {
            this.options4 = data.values;
        }

    }
    @track options5 = [];
    @wire(getObjectInfo, { objectApiName: vechile })
    objectInfo5;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo5.data.defaultRecordTypeId', fieldApiName: transmission})
    typePicklistValues5({error, data}) {
        if(data) {
            this.options5 = data.values;
        }

    }
    handleKeymakeyear( event ) {  
      
        this.searchmakeyear = event.target.value;  
    
      
     
       
      }  
      handlekmsdrive( event ) {  
      
        this.searchkmsdriven = event.target.value;  
      
      
      
      }  
      handlefueltype( event ) {  
      
        this.searchfueltype = event.target.value;  
     
     
     
      }  
      handlebodytype( event ) {  
      
        this.searchbodytype = event.target.value;  
      
     
     
      }  
      handletransmissiontype( event ) {  
      
        this.searchtransmissiontype = event.target.value;  
      
      }  

      
          handlebrand( event ){
        this.searchbrand = event.target.value;  
        
        
        
        } 
      
        handlesearch() {
        
        getallvehciles1({makeyear: this.searchmakeyear, kms: this.searchkmsdriven, fueltype: this.searchfueltype, bodytype: this.searchbodytype, transmission: this.searchtransmissiontype, 
                           brand: this.searchbrand, color: this.searchcolor  })
        .then(result => {
            this.records = result;
           
        })
        .catch(error => {
            this.errors = error;
          
        });
    }
    
}