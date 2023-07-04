import { LightningElement,wire,api,track} from 'lwc';
import getAllTables from '@salesforce/apex/CustomerStatus.getAllTables';
import createlead from '@salesforce/apex/leadConversion2.createlead';
import changecustomerstatus from '@salesforce/apex/CustomerStatus.changecustomerstatus';

export default class CustomerEnquiryTableComponent extends LightningElement
{ 
      @track records;
      @track recordId;
      @track stlabel;

      @wire(getAllTables)
      wiredvehicle({ error, data }) {
        if (data) {
          this.records = data;
          this.error = undefined;
        } 
        else if (error) 
        {
          this.error = error;
          this.records = undefined;
        }
      }
 
      pathHandler(event)
      {
        const step = event.currentTarget;
        this.recordId = step.dataset.recordid;
        const value = step.value;
        this.stlabel=event.target.label;

        if (value == '3') 
        {
          alert(this.recordId);
          createlead({ lead:this.recordId })
        } 
        else
        {
            alert(this.stlabel);
            alert(this.recordId);
            changecustomerstatus({recid:this.recordId , stat:this.stlabel})
        }
        
      }
}