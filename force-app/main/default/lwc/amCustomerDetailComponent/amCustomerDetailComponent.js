import { LightningElement ,track,api} from 'lwc';
import getPhoneNum from '@salesforce/apex/AmCustomerDetailController.getPhoneNum';
import createCST from '@salesforce/apex/AmCustomerDetailController.createCST';
import converttold from '@salesforce/apex/leadConversion2.createlead';



import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Alreadyvisitedcustomer extends LightningElement {

    
    @track input;
    @track isFormVisible = false;
    @track butval;
    @track showpage=false;
    @track data;
    @api records;

    @track dataid;

    handleChange(event)
    {
        this.input=event.target.value;
    }
   
    handleShowModal(event)
    {
         getPhoneNum({ph:this.input})

        .then(result => {
            this.data=result;
            
            alert(this.data);
            this.records=this.data;
            
            this.record = this.records[0].Id; 
            // Set record to the ID of the first record in the data array
           
        this.dataid = this.record;
        
        this.isFormVisible = true;

        this.template.querySelector('[data-id="curtainModal"]').style.width = "100%";

        })
        .catch(error => {
            this.isFormVisible = true;
            alert(this.isFormVisible);
            const toastEvent = new ShowToastEvent({
                title: 'Error!',
                message: 'Invalid Phone number. Please enter a valid Phone number.',
                variant: 'error'
            });
            this.dispatchEvent(toastEvent);
        });

      
    
    }
    closeModal() 
    {
        this.template.querySelector('[data-id="curtainModal"]').style.width = "0%";
    }
    
    handlekick()
    {
        createCST({cid:this.dataid})

        .then(() => {
            const toastEvent = new ShowToastEvent({
                title: 'Success!',
                message: 'Record updated successfully.',
                variant: 'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error => {
            const toastEvent = new ShowToastEvent({
                title: 'Error!',
                message: error.body.message,
                variant: 'error'
            });
            this.dispatchEvent(toastEvent);
        });
    }
    handlekick1(event)
    {
        this.butval=event.target.value;
        alert('uday');
        alert(this.butval);
        converttold({leadId:this.butval})

      

    }
    handle(){
        this.showpage=true;
    }
}