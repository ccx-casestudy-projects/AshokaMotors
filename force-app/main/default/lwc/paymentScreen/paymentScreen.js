import { LightningElement ,track,api,wire} from 'lwc';
import getProductPrice from '@salesforce/apex/AMVehclRepairHandlerClass.getProductPrice';
import calculatingSalesDiscount from '@salesforce/apex/AMVehclRepairHandlerClass.calculatingSalesDiscount';
import customerHasPaid from '@salesforce/apex/AMVehclRepairHandlerClass.customerHasPaid';
import SearchVehicleSales from '@salesforce/apex/AMVehclRepairHandlerClass.SearchVehicleSales';

import uploadAttachment from '@salesforce/apex/AMVehclRepairHandlerClass.uploadAddress';

import qrcode from '@salesforce/resourceUrl/qrcode';
import LightningConfirm from 'lightning/confirm';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD  from '@salesforce/schema/Account.Phone';
import City_FIELD  from '@salesforce/schema/Account.BillingCity';
import State_FIELD  from '@salesforce/schema/Account.BillingState';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/PaymentColor'

export default class PaymentScreen extends LightningElement 
{
    Qrcode =qrcode;
    @track currentStep = '1';

    @track disamount = false;
    @track dispercent = true;
    @track showCash = true;
    @track showUPI = false;
    @track selectedValue='Cash';
    @track hasVehSale=0;
    @track DueAmount=true;
    
    @track isCustomerOpen=true;
    @track isProofsOpen=false;
    @track isDiscountOpen=false;

    typeoddisc='DiscountAmt';
    @track discount=0;
    @track discount1=0;
    @track ShowDisAmount = true;
    @track ShowDisPercentage = false;
     
    @track DueisAvailable=false;
    @track AdvanceisAvailable=false;

    CarPrices;
    today
    Dis;
    Dis1;
    netTotal;
    customerID1;
    miniSellingPrice;
    @track CusPhone;
    CusName;
    Cuscity;
    Cusstate;

    @api selectedCar;
    @api selectCustomer;
    @api Due;//Amount from Home Screen Via Phone Number Existing Record
    @api AmountPaid;//Amount from Home Screen Via Phone Number Existing Record
    @api Tax;//Tax from Home Screen Via Phone Number Existing Record
    @api DiscPerc;//Discount from Home Screen Via Phone Number Existing Record
    @api DiscAmount;//Discount from Home Screen Via Phone Number Existing Record
    
    @track AmounPaid=0;
    @track AdvancePaid=0;
    @track Balance=0;
    @track Dues=0;
    @track tax=0;

     // Function to wire the data
     @wire(getProductPrice, { vid: '$selectedCar' })
     wiredAccount({ error, data }) {
         if (data) {
             const selectCar = data[0];
 
             const CarPrice = [
                 selectCar.AM_Customer_Selling_Price__c
             ];
             this.CarPrices = CarPrice;
         }
     }

     @wire(getRecord, {
        recordId: '$selectCustomer',
        fields: [NAME_FIELD,PHONE_FIELD,State_FIELD,City_FIELD]
      })
      wiredCustomer({ error, data }) 
      {
        if (data) 
        {
          this.CusName = getFieldValue(data, NAME_FIELD);
          this.CusPhone= getFieldValue(data, PHONE_FIELD);
          this.Cuscity= getFieldValue(data, City_FIELD);
          this.Cusstate=getFieldValue(data,State_FIELD);
        }
      }
    
     refreshWiredData() 
     {
         getProductPrice({ vid: this.selectedCar })
             .then((result) => {
                 const selectCar = result[0];
 
                 const CarPrice = [
                     selectCar.AM_Customer_Selling_Price__c
                 ];
                 this.CarPrices = CarPrice;
             })
             .catch((error) => {
                 // Handle the error
             });
     }

    // Connected callback
    connectedCallback() 
    {
        this.refreshWiredData();
        this.customerID1=this.selectCustomer;
        this.Dues=this.Due; 
        
        this.Dis=this.DiscAmount;
        this.discount=this.DiscAmount;

        this.Dis1=this.DiscPerc;
        this.discount1=this.DiscPerc;

        this.tax=this.Tax;
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        this.today = mm + '/' + dd + '/' + yyyy;

        SearchVehicleSales({vid:this.selectedCar,cid:this.selectCustomer})
        .then((result) => 
        {
           this.AdvancePaid=result[0].AM_Amount_Paid__c;
           if(this.AdvancePaid>0)
           {
               this.AdvanceisAvailable=true;
           }
        })
        .catch(error => {
            // Handle any errors that occur during the Apex method call
            console.error('Error retrieving vehicle sales:', error);
          });
    }
    
    Paymentoptions = [
        { label: 'Cash', value: 'Cash' },
        { label: 'UPI', value: 'UPI' }
    ];

    get DiscountOptions()
    {
     return [
            {label:'Discount%',value:'Discount%'},
             {label:'Discount Amt',value:'DiscountAmt'},
             ]
    };

    CloseDiscountModal()
    {
        this.isDiscountOpen=false;
    }
    CloseCustomeModal() 
    {
        this.isCustomerOpen = false;
    }
    closeProofsModal()
    {
        this.isProofsOpen = false;
    }
    handleOpenDiscount()
    {
        this.isDiscountOpen=true;
    }
    NavToProof() 
    {
        this.isCustomerOpen = false;
        this.isDiscountOpen=false;
        this.isProofsOpen=true;
    }
    NextToDiscount()
    {
        this.isCustomerOpen = false;
        this.isDiscountOpen=true;
        this.isProofsOpen=false;
    }
    ///////////Here Starts Actual code..

    file;
    handleFileChange(event) 
    {
        this.file= event.target.files[0];
    }
    uploadFile(event) 
    {
       
        if (this.file) 
        {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileContents = reader.result.split(',')[1];
                const fileName = this.file.name;
                const contentType = this.file.type;

                uploadAttachment({AccountId: this.selectCustomer, fileName, fileContents, contentType ,vehicleId:this.selectedCar})
                .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully document is Uploaded',
                    variant: 'success'
                })
            );
            this.refreshApexData(); // Call the refresh method after upload is completed
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error in document uploading: ' + error.body.message,
                    variant: 'error'
                })
            );
        });
            };
            reader.readAsDataURL(this.file);
        }
    }

    handleChange(event) 
    {
        this.selectedValue=event.target.value;
            if(this.selectedValue=='Cash')
            {
                this.showCash=true;
                this.showUPI=false;
            }
            else if (this.selectedValue=='UPI')
            {
                this.showCash=false;
                this.showUPI=true;
            }
    }
    handleDiscountClick(event)
    {
       this.Dis=event.target.value;
       
        calculatingSalesDiscount({vid:this.selectedCar,discount:this.Dis,discountperc:this.discount1,AmountToPaid:this.AmounPaid,Tax:this.tax,cphone:this.CusPhone})
        .then((result) => 
        {
            if (result.length > 0) 
            {
                this.netTotal=result[0];
                this.miniSellingPrice=result[1];
                this.Balance=result[2];
            }
            
        })
      
       this.discount=this.Dis;

        if(this.miniSellingPrice > this.netTotal)
        {
            LightningConfirm.open
            ({
                message: 'Decrease The Discount As It Exceeding Minimum Profit',
                label: 'Discount Is Exceeding',
                theme: 'error'
                // setting theme would have no effect
            });
           
        }
    }

    handleDiscountClickpercent(event)
    {
        this.Dis1=event.target.value;
        calculatingSalesDiscount({vid:this.selectedCar,discount:this.Dis,discountperc:this.discount1,AmountToPaid:this.AmounPaid,Tax:this.tax,cphone:this.CusPhone})
        .then((result) => 
        {
            if (result.length > 0) 
            {
                this.netTotal=result[0];
                this.miniSellingPrice=result[1];
                this.Balance=result[2];
            }
           
        })
        this.discount1=this.Dis1;
        if(this.miniSellingPrice > this.netTotal)
        {
            LightningConfirm.open
            ({
                message: 'Decrease The Discount As It Exceeding Minimum Profit',
                label: 'Discount Is Exceeding',
                theme: 'error'
                // setting theme would have no effect
            });
        }
    }

    handleAmountPaid(event)
    {
        this.AmounPaid=event.target.value;
        calculatingSalesDiscount({vid:this.selectedCar,discount:this.Dis,discountperc:this.discount1,AmountToPaid:this.AmounPaid,Tax:this.tax,cphone:this.CusPhone})
        .then((result) => 
        {
            if (result.length > 0) 
            {
                this.netTotal=result[0];
                this.miniSellingPrice=result[1];
                this.Balance=result[2];
            }
           
        })
        
    }
    handleTax(event)
    {
        
        this.tax=event.target.value;
        calculatingSalesDiscount({vid:this.selectedCar,discount:this.Dis,discountperc:this.discount1,AmountToPaid:this.AmounPaid,Tax:this.tax,cphone:this.CusPhone})
        .then((result) => 
        {
            if (result.length > 0) 
            {
                this.netTotal=result[0];
                this.miniSellingPrice=result[1];
                this.Balance=result[2];
            }
           
        })
       
    }

    handlediscount(event)
    {
        this.typeoddisc=event.target.value;
        if(this.typeoddisc=='Discount%')
        {
            this.disamount=true;
            this.dispercent=false;
            this.ShowDisPercentage=true;
            this.ShowDisAmount=false;
        }
        else if (this.typeoddisc=='DiscountAmt')
        {
            this.disamount=false;
            this.dispercent=true;
            this.ShowDisAmount=true;
            this.ShowDisPercentage=false;
        }
    }
    handlediscountchange(event) 
    {
        this.discount = event.target.value;
    }
    handlediscountchange1(event) 
    {
        this.discount1 = event.target.value;
    }
    handlesave()
    {   
       
        this.Dis=this.discount;
        this.Dis1=this.discount1;
        calculatingSalesDiscount({vid:this.selectedCar,discount:this.Dis,discountperc:this.discount1,AmountToPaid:this.AmounPaid,Tax:this.tax,cphone:this.CusPhone})
        .then((result) => 
        {
            if (result.length > 0) 
            {
                this.netTotal=result[0];
                this.miniSellingPrice=result[1];
                this.Balance=result[2];
            }
        })

        this.isDiscountOpen = false;
       
        if(this.miniSellingPrice > this.netTotal)
        {
            LightningConfirm.open
            ({
                message: 'Decrease The Discount As It Exceeding Minimum Profit',
                label: 'Discount Is Exceeding',
                theme: 'error'
                // setting theme would have no effect
            });
        }
    }
   
    renderedCallback()
    { 
        if(this.isCssLoaded)
        {
            return
        } 
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.log(error)
        });

        if(this.Dues>0)
        {
            this.DueisAvailable=true;
        }
       
    }
    handlePayment(event)
    {
       customerHasPaid({vid:this.selectedCar,cid:this.selectCustomer,pricesold:this.netTotal,discou:this.discount,discperc:this.discount1,Tax:this.tax,amountPaid:this.AmounPaid,Balance:this.Balance})
       .then(() => {
        // Display a success toast message
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Payment successfully',
                variant: 'success',
            })
        )
        .catch((error) => {
            // Handle the error
        });
     })
    }
   
}