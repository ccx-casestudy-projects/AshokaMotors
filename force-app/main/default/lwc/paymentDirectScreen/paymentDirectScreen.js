import { LightningElement,track,api } from 'lwc';
import getCustomerAndVehicleData from '@salesforce/apex/AMVehclRepairHandlerClass.getCustomerAndVehicleData';

import { NavigationMixin } from 'lightning/navigation';

export default class PaymentDirectScreen extends NavigationMixin(LightningElement) {

    @track selectCustomer;
    @track selectedCar;
    @track BalanceAmount=0;
    @track AmountPaid=0;
    @track Due=0;
    @track Tax=0;
    @track DiscPerc=0;
    @track DiscAmount=0;

    handleGivenPhoneNum(event)
    {
        this.PhoneNum=event.target.value;
    }
    handleVehicleNum(event)
    {
        this.VehicleNum=event.target.value;
       
    }
    
    goToMainScreen()
    {
        let compDefinition = {
            componentDef: "c:homescreen",
            attributes: {
            }
        };
     
        // Base64 encode the compDefinition JS object
        let encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedCompDef
            }
        });
    }

    handleSearch(event)
    {
        this.isModalOpen=false;
        getCustomerAndVehicleData({cphone:this.PhoneNum,VehName:this.VehicleNum})
        .then((result) => 
        {
          this.selectCustomer=result[0];
          this.selectedCar=result[1];


          let compDefinition = 
          {
              componentDef: "c:PaymentScreen",
              attributes: {
                  selectedCar:this.selectedCar,
                  selectCustomer:this.selectCustomer,
                  AmountPaid: this.AmountPaid,
                  BalanceAmount:this.BalanceAmount,
                  Due:this.Due,
                  Tax:this.Tax,
                  DiscPerc:this.DiscPerc,
                  DiscAmount:this.DiscAmount
     
              }
          };
       
          // Base64 encode the compDefinition JS object
          let encodedCompDef = btoa(JSON.stringify(compDefinition));
          this[NavigationMixin.Navigate]({
              type: "standard__webPage",
              attributes: {
                  url: "/one/one.app#" + encodedCompDef
              }
          });
        })
        
    }
}