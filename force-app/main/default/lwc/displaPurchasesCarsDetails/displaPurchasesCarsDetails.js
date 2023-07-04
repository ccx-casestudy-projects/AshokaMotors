import { LightningElement,wire,track} from 'lwc';
import purchasedCarDetails from '@salesforce/apex/PurchasedCarDetailsForManagerController.purchasedCarDetails';
const columns = [
    { label: 'AM Vehicle Identification Numbe', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
];
export default class DisplaPurchasesCarsDetails extends LightningElement 
{

   

        error;
        columns = columns;
    
        @wire(purchasedCarDetails)
        contacts;
}