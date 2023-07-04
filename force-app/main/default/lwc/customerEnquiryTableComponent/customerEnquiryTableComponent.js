import { LightningElement,wire,api,track} from 'lwc';
import getAllTable from '@salesforce/apex/CustomerEnquiry.getAllTable';

export default class CustomerEnquiryTableComponent extends LightningElement
{
 @track records;
 @api errors;
 @wire(getAllTable)
 wiredvehicle({ error, data }) {
if (data) {
 this.records = data;
 this.initialrecords = this.records;
 this.error = undefined;
} else  {
 this.error = error;
} }

}