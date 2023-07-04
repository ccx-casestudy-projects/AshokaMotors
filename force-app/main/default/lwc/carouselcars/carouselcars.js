import { LightningElement ,api,track,wire} from 'lwc';
import carouselcars from '@salesforce/resourceUrl/carouselcars'
import getImages from '@salesforce/apex/CarouselImages.getImages';
import {loadStyle} from 'lightning/platformResourceLoader' ;

import brandicon from '@salesforce/resourceUrl/MarutiSuzuki';

import { NavigationMixin } from 'lightning/navigation';
export default class Carouselcars extends NavigationMixin(LightningElement) {
    
    @track imageRecords;
    @track imageName;
    @api vehid;
    @api customerid;
    @api selectedIds;
    isCssLoaded = false;
    currentSlide = 1;
    slideCount = 0;
    slideWidth = 0;
    carouselStyle = '';
    carouselItemStyle = '';
    
    //BrandIcon=brandicon;
   
    @wire(getImages,{vid:'$vehid'})
    wiredAccount( { error, data } )
    {
        if (data)
        {
            const imageRecord = data[0];
            // create an array of image URLs from the image record fields
            const imageUrls = [
                imageRecord.AM_Vehicle_Main_Image__c,
                imageRecord.AM_Vehicle_Exterior_Image_1__c,
                imageRecord.AM_Vehicle_Exterior_Image_2__c,
                imageRecord.AM_Vehicle_Interior_Image_1__c,
                imageRecord.AM_Vehicle_Interior_Image_2__c
            ];
            const imagemodels=[
                imageRecord.AM_Vehicle__r.AM_Vehicle_Model__c,
            ];
            const imageyears=[
                imageRecord.AM_Vehicle__r.AM_Make_Year__c,
            ];
            const imagebrand=[
                imageRecord.AM_Vehicle__r.AM_Brand__c,
            ];
            const imageprice=[
                imageRecord.AM_Vehicle__r.AM_Customer_Selling_Price__c,
            ];
            const imagevariant=[
                imageRecord.AM_Vehicle__r.AM_Variant__c,
            ];
            const imagestatus=[
                imageRecord.AM_Vehicle__r.AM_Vehicle_Status__c,
            ];
            const imagetypecar=[
                imageRecord.AM_Vehicle__r.AM_Vehicle_Owner_Type__c,
            ];
            const imagefueltype=[
                imageRecord.AM_Vehicle__r.AM_Fuel_Type__c,
            ];
            const imagetranstype=[
                imageRecord.AM_Vehicle__r.AM_Transmission_Type__c,
            ];
            const imagekmsdriven=[
                imageRecord.AM_Vehicle__r.KMS_Travelled__c,
            ];
            const imagevehcapacity=[
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
        }
    }
 
    CallMain()
    {
        alert('back');
        alert(this.customerid);
        let compDefinition = {
            componentDef: "c:disaplaycars",
            attributes: {
                customerid:this.customerid
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

    renderedCallback()
    { 
       
    if(this.isCssLoaded) return
    this.isCssLoaded = true
    const style = document.createElement('style');
        style.innerText = `.slds-carousel__content {
            display: none;
        }`;
        this.template.querySelector('lightning-carousel').appendChild(style);
    loadStyle(this, carouselcars).then(()=>{
        console.log("Loaded Successfully")
    }).catch(error=>{ 
        console.error("Error in loading the colors")
    })
    }

}