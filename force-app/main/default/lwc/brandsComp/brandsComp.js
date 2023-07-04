import { LightningElement,api,track,wire } from 'lwc';
import getallvehciles from '@salesforce/apex/BrandComp.getvehicledetails';
import getallvehciles1 from '@salesforce/apex/BrandComp.getvehicledetails1';

// staticResourceExample.js
import AllCarLogos from '@salesforce/resourceUrl/AllCarLogos';
Audi= CarLogos + '/Audi.png';
BMW= CarLogos + '/BMW.png';
FORDN= CarLogos +'/FORDN.png';
Honda= CarLogos +'/Honda.png';
KIA= CarLogos +'/KIA.png';
Mahindra= CarLogos +'/Mahindra.png';
MarutiSuzuki= CarLogos + '/maruti-suzuki.png';
MercedesBenz= CarLogos + '/Mercedes-benz.png';
Hyundai= Hyundai + '/Hyundai.png';
renault= CarLogos + '/renault.png';
Tata= CarLogos + '/Tata.png';
Toyota= CarLogos + '/Toyota.png';
Volkswagen= CarLogos + '/Volkswagen.png';

export default class brandsComp extends LightningElement {
    @track brand;
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

selectedCar(event) {
    let img = event.target;
    let value = img.getAttribute('alt');
    this.brand=value;
  
     
    getallvehciles1({brand: this.brand})
    .then(result => {
        this.records = result;
      
       
    })
    .catch(error => {
        this.errors = error;
      
    });
  }

}