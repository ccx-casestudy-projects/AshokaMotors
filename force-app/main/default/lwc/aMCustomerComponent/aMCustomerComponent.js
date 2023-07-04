import { LightningElement } from 'lwc';
import Name from '@salesforce/schema/Lead.Name'
import Email from '@salesforce/schema/Lead.Email'
import Phone from '@salesforce/schema/Lead.Phone'
import Company from '@salesforce/schema/Lead.Company'
import Status from '@salesforce/schema/Lead.Status'


import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
export default class Registration extends LightningElement {

    objectApiName = 'Lead'; 
    Fields1 = [Name,Email,Phone,Company,Status]; 

    recordCreated(){
        const showSuccess = new ShowToastEvent({
            title: 'Success!!',
            message: 'AM Customer Registration Successful',
            variant: 'Success',
        });
        this.dispatchEvent(showSuccess);
    }
}