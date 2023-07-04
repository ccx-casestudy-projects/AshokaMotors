import { LightningElement,wire,track,api} from 'lwc';
import getImages from '@salesforce/apex/CarouselImages.getImages';


export default class LWCParentSliders extends LightningElement {
   slider1Image;
   slider2Image;
   slider3Image;
   slider4Image;
   slider5Image;
   @track PosName;
   @track Posfun;
   @track Posyear;
   @track Posvariant;
   @track Posamount;

    @wire(getImages, { vid: '01t5i000005nv4yAAA' })
    wiredAccount( { error, data } )
    {
        if (data)
        {
            const imageRecord = data[0];

            const imageUrls2 = [
                imageRecord.AM_Vehicle_Exterior_Image_1__c,
            ];
            const imageUrls1 = [
                imageRecord.AM_Vehicle_Main_Image__c,
            ];
            const imageUrls3 = [
                imageRecord.AM_Vehicle_Exterior_Image_2__c,
            ];
            const imageUrls4 = [
                imageRecord.AM_Vehicle_Interior_Image_1__c,
            ];
            const imageUrls5 = [
                imageRecord.AM_Vehicle_Interior_Image_2__c,
            ];
            
            const imagename = [
                imageRecord.AM_Vehicle__r.AM_Brand__c,
            ];
            const imagefun = [
                imageRecord.AM_Vehicle__r.AM_Vehicle_Model__c,
            ];
            const imageyear = [
                imageRecord. AM_Vehicle__r.AM_Make_Year__c,
            ];
            const imagevariant = [
                imageRecord. AM_Vehicle__r.AM_Variant__c,
            ];
            const imageamount = [
                imageRecord. AM_Vehicle__r.AM_Vehicle_Final_Amount__c,
            ];

            this.slider1Image = imageUrls1;
            this.slider2Image = imageUrls2;
            this.slider3Image = imageUrls3;
            this.slider4Image = imageUrls4;
            this.slider5Image = imageUrls5;

            this.PosName = imagename;
            this.Posfun = imagefun;
            this.Posyear=imageyear;
            this.Posvariant = imagevariant;
            this.Posamount=imageamount;
        }
    }

    // Slider configuration
    autoScroll = false;

    get sliderData() 
    {   
        return [{
                "image": this.slider1Image,
                "heading": "",
                "description": "",
            },
            {
                "image": this.slider2Image,
                "heading": "",
                "description": "",
            },
            {
                "image": this.slider3Image,
                "heading": "",
                "description": "",
            },
            {
                "image": this.slider4Image,
                "heading": "",
                "description": "",
            },
            {
                "image": this.slider5Image,
                "heading": "",
                "description": "",
            },
            
        ];
    }
    connectedCallback()
    {
        return [
            this.PosName,
            this.Posfun,
            this.Posyear,
            this.Posvariant ,
            this.Posamount,
        ];
    }
}