import { LightningElement,track } from 'lwc';

export default class TrailLookupMain extends LightningElement
 {

    @track accountName;  
    @track accountRecordId;  
 
    onAccountSelection(event){  
    this.accountName = event.detail.selectedValue;  
    this.accountRecordId = event.detail.selectedRecordId;  
    }  
 }