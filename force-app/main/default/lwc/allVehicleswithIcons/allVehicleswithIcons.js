import { LightningElement,wire } from 'lwc';
import { getRecordUi } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BMWNew from '@salesforce/resourceUrl/BMWNew';
import HondaNew from '@salesforce/resourceUrl/HondaNew';
import TataN from '@salesforce/resourceUrl/TataN';
import getvehicledetails from '@salesforce/apex/AllVehicleswithIconsController.getvehicledetails';
export default class AllVehicleswithIcons extends LightningElement {
    vehicles;
    carIcon;
getCarIcon(brand)   
 {
    if (brand === 'BMW') {
        return BMWNew;
    } else if (brand === 'Honda') {
        return HondaNew;
    } else if (brand === 'Tata') {
        return TataN;
    } else {
        // Return a default icon if needed
        return '';
    }
}

    @wire(getvehicledetails)
    wiredVehicles({ data, error }) {
        if (data) {
            this.vehicles = data;
        } else if (error) {
            // Handle error
        }
    }
}