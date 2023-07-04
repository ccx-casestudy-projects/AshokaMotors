import { LightningElement, wire,track,api} from 'lwc';
import getCarSalesListWrapper from '@salesforce/apex/CarSalesclass.getCarSalesListWrapper';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { NavigationMixin } from 'lightning/navigation';
import vechile from '@salesforce/schema/Product2';
import brand1 from '@salesforce/schema/Product2.AM_Brand__c';
import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'

const columns = [
  { label: 'Vehicle No', fieldName: 'vehicleRegistrationNumber',sortable: "true",
  cellAttributes: {
    class: 'slds-theme_shade slds-text-color_error',
    style:"Font-weight:bold"
    
    } },
    { 
        label: 'Brand', fieldName: 'brand' ,
        actions: [{ 
    label: 'Filter', 
    type: 'button', 
    name: 'filterbrand',
    iconName: 'utility:filter',
    disabled: false
  }]},


  { label: 'Model', fieldName: 'amModel' ,sortable: "true"},
  { label: 'Purchase Date', fieldName: 'vehiclePurchaseDate' ,sortable: "true"},
  { label: 'Purchase Amount', fieldName: 'vehiclePurchaseAmount',sortable: "true" ,type:'currency'},
  { label: 'Dealer Amount', fieldName: 'dealerAmount',sortable: "true" ,type:'currency'},
  { label: 'Price Sold', fieldName: 'priceSold' ,sortable: "true",type:'currency'},
  { label: 'Profit Gained', fieldName: 'profitGained' ,sortable: "true",type:'currency'},
  { label: 'Due', fieldName: 'BalanceDue' ,sortable: "true",type:'currency'},
  { label: 'Sold Date', fieldName: 'soldDate' ,sortable: "true"},
  
  
];

export default class CarSales extends NavigationMixin(LightningElement) 
{
    showbrandpopup = false;
    @track sortBy;
    @track sortDirection;
    @track searchTerm ='';
    @track branssearch='';
  columns = columns;
  isCssLoaded = false;
  cases = [];
    ALL_CASES = [];
    latestActions = [];
    months;
    years;
 
    getmonth='';
    getYear='';

    get options1() {
        return [
            { label: '2025', value: '2025' },
            { label: '2024', value: '2024' },
            { label: '2023', value: '2023' },
            { label: '2022', value: '2022' },
            { label: '2021', value: '2021' },
        ];
    }

    get options2() 
    {
        return [
            { label: 'Dec', value: '12' },
            { label: 'Nov', value: '11' },
            { label: 'Oct', value: '10' },
            { label: 'Sept', value: '9' },
            { label: 'Aug', value: '8' },
            { label: 'July', value: '7' },
            { label: 'June', value: '6' },
            { label: 'May', value: '5' },
            { label: 'Apr', value: '4' },
            { label: 'Mar', value: '3' },
            { label: 'Feb', value: '2' },
            { label: 'Jan', value: '1' }
        ];
    }

  @wire(getCarSalesListWrapper,{searchTerm: '$searchTerm',searchTerm2:'$getmonth',searchTerm3:'$getYear',searchTerm4:'$branssearch'}) 
  wiredCases({ error, data }) 
  {
    if (data) {
        
        this.ALL_CASES = data;
        this.cases = data;
        this.error = undefined;
    } else if (error) {
        this.error = error;
        this.contacts = undefined;
    }
  }
  @track brandoptions = [];
  @wire(getObjectInfo, { objectApiName: vechile })
  objectInfo1;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo1.data.defaultRecordTypeId', fieldApiName: brand1 })
  typePicklistValues1({ error, data }) {
    if (data) {
      this.brandoptions = data.values;
    }

  }
    
  handlebrandsearch(event)
    {
        this.branssearch=event.detail.value;
        alert(this.branssearch);
    }
    changeMonth(event)
    {
        this.getmonth=event.detail.value;
    }
    changeYear(event)
    {
        this.getYear=event.detail.value;
    }
    handleHeaderAction(event) {
        const actionName = event.detail.action.name;
       if (actionName === 'filterbrand') {
          this.showbrandpopup = !this.showbrandpopup;
        }
        //this.applyFiltersAndSorting();
      }
      
  CallMain()
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
  closebrandPopup() {
    this.showbrandpopup = false;
}

  handleSearch(event) 
  {
    let date = new Date(event.target.value);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    this.searchTerm = year + '-' + month + '-' + day;

    // Update the SOQL query to filter records by the Am_Sold_Date__c field
    this.Sales = getCarSalesListWrapper({ field: this.sortBy, sortOrder: this.sortDirection, searchTerm: this.searchTerm });

  }

  
    

doSorting(event) 
{
  this.sortBy = event.detail.fieldName;
  this.sortDirection = event.detail.sortDirection;
  this.sortData(this.sortBy, this.sortDirection);
}
sortData(fieldname, direction) 
{
  let parseData = JSON.parse(JSON.stringify(this.Sales.data));
  let keyValue = (a) => {
      return a[fieldname];
  };
  let isReverse = direction === 'asc' ? 1: -1;
  // sorting data
  parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : ''; // handling null values
      y = keyValue(y) ? keyValue(y) : '';
      // sorting values based on direction
      return isReverse * ((x > y) - (y > x));
  });
  this.Sales.data = parseData;
}    
  renderedCallback()
  { 
    if(this.isCssLoaded){
        return
    } 

    this.isCssLoaded = true

    loadStyle(this, COLORS).then(()=>{
        console.log("Loaded Successfully")
    }).catch(error=>{ 
        console.log(error)
    });
  }
}