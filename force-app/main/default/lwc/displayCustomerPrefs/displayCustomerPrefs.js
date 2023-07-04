import { LightningElement, wire } from 'lwc';
import getCustomerdetails from '@salesforce/apex/CustomerEnquiryDetailsController.displayCustomerRecords';

const columns = [
  { label: 'Customer Name', fieldName: 'AM_Customer_Name__c' },
  { label: 'VehicleNo', fieldName: 'AM_Vehicle__c', type: 'text' },
  { label: 'Brand', fieldName: 'AM_Brand__c' },
  
];

export default class DisplayCustomerPrefs extends LightningElement {
  records;
  error;
  columns = columns;
  draftValues = [];

  @wire(getCustomerdetails)
  wiredAccount({ data, error }) {
    if (data) {
      let tempRecords = JSON.parse(JSON.stringify(data));
      tempRecords = tempRecords.map((row) => {
        return {
          ...row,
          VehicleNo: row.AM_Vehicle__r ? row.AM_Vehicle__r.Name : null,
        };
      });
      this.records = tempRecords;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.records = undefined;
    }
  }
}