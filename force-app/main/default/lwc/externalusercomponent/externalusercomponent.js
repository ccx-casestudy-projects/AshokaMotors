import { LightningElement,track,wire} from 'lwc';
import getallvehciles from '@salesforce/apex/getsearchfilterdatacontroller.getvehicledetails';
export default class Externalusercomponent extends LightningElement {
    @track records;
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
}