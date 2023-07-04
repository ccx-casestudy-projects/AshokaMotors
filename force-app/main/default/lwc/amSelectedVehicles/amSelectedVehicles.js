import { LightningElement,wire, api, track  } from 'lwc';
import insertSelectedCars from '@salesforce/apex/displaycars1.insertSelectedCars';
import displaycarselected from '@salesforce/apex/displaycars1.displaycarselected';

import uploadAttachment from '@salesforce/apex/AMVehclRepairHandlerClass.uploadAddress';

import noHeader from '@salesforce/resourceUrl/NoHeader';
import {loadStyle} from "lightning/platformResourceLoader";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import styles from '@salesforce/resourceUrl/style';
import { NavigationMixin } from 'lightning/navigation';

import LightningModal from 'lightning/modal';


export default class AmSelectedVehicles extends NavigationMixin(LightningElement)  
{
    @api customerid; 
    @api selectedCars1=[]; 
    @api records;

    @track recordId;
    @track selectedCar;
    @track selectCustomer;
    @track isModalOpen=false;
    @track selectedId;
    @track selectedId1;
    @track Proof=false;
    @track recordform=true;
    @track carId;
    @track AmountPaid=0;
    @track Due=0;
    @track Tax=0;
    @track DiscPerc=0;
    @track DiscAmount=0;
   
    getquoteforall()
    {
        alert(this.selectedCars1);
       
        let compDefinition = {
            componentDef: "c:discountcomp",
            attributes: {
                selectCustomer :this.customerid ,
                selectedCars2:this.selectedCars1
            }
        };
        let encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedCompDef
            }
        });

    }
    handleBilling(event) 
    {
      this.isModalOpen = true;
      let selectedButton = event.target;
      this.selectedId = selectedButton.dataset.id;

      alert(this.customerid);
      let compDefinition = {
        componentDef: "c:PaymentScreen",
        attributes: {
            selectCustomer :this.customerid,
            selectedCar :this.selectedId,
            AmountPaid: this.AmountPaid,
            Due:this.Due,
            DiscAmount:this.DiscAmount,
            DiscPerc:this.DiscPerc,
            Tax:this.Tax
        }
    };
    let encodedCompDef = btoa(JSON.stringify(compDefinition));
    this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
            url: "/one/one.app#" + encodedCompDef
        }
    });
     
    }

    handleQuote(event)
    {
    this.selectedId1=event.target.dataset.id;
    this.selectedCars1=[];
    this.selectedCars1.push(this.selectedId1);
    let compDefinition = {
        componentDef: "c:discountcomp",
        attributes: {
            selectCustomer :this.customerid,
            selectedCars2:this.selectedCars1
        }
    };
    let encodedCompDef = btoa(JSON.stringify(compDefinition));
    this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
            url: "/one/one.app#" + encodedCompDef
        }
    });
    
  }

    connectedCallback()
    {
        console.log("customerid");
        console.log(this.customerid);
        
        for (const value of this.selectedCars1)
        {
            alert(value);
        }
        loadStyle(this, noHeader);
        displaycarselected({ 
            selectedCarIds :this.selectedCars1
        })
        .then(result => 
        {
          this.data=result;
          this.records= this.data;
        
        })
         .catch((error) => {
          console.error(error);
        });
    }
    handleRemove(event) 
    {
        const carIdToRemove = event.target.value;
        const updatedSelectedCars = new Set([...this.selectedCars1].filter(carId => carId !== carIdToRemove));
        this.selectedCars1 = updatedSelectedCars;
        const updatedRecords = this.records.filter(car => car.Id !== carIdToRemove);
        this.records = updatedRecords;
    }
    handleSave() 
    {
        const myList = Array.from(this.selectedCars1);
        insertSelectedCars({ 
            selectedCarIds :myList,
            custmID : this.customerID1
        })
        .then(() => {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Success',
                  message: 'Successfully save the record in Selected Cars',
                  variant: 'success'
              })
          );
      })
      .catch(error => {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Error',
                  message: 'Error in saving the record in Selected Cars: ' + error.body.message,
                  variant: 'error'
              })
          );
      });            
    }
    
  handleBack(event)
  {
    let compDefinition = {
        componentDef: "c:disaplaycars",
        attributes: {
            selectedIds:this.selectedCars1
        }
    };
    let encodedCompDef = btoa(JSON.stringify(compDefinition));
    this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
            url: "/one/one.app#" + encodedCompDef
        }
    });
  }
  
}