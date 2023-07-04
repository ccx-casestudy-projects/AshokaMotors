import { LightningElement,wire,track } from 'lwc';
import getInvestmentProfits from '@salesforce/apex/AMVehclRepairHandlerClass.getInvestmentProfits';

import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/Colors1'

import { NavigationMixin } from 'lightning/navigation';

const columns = [
    {
        label: 'Invested Year',
        fieldName: 'investmentYear',
        sortable: true,
        cellAttributes: {
            class: 'slds-theme_shade slds-text-color_error',
            style: 'font-weight:bold'
        }
    },
    
    { label: 'Invested Month', fieldName: 'investmentMonth' ,sortable: "true"},
    { label: 'Opening Stock', fieldName: 'openStock' ,type: 'currency',sortable: "true"},
    { label: 'Closing Stock', fieldName: 'closStock',type: 'currency',sortable: "true" },
    { label: 'Invested Amount', fieldName: 'investmentAmount',type: 'currency',sortable: "true" },
    { label: 'Income', fieldName: 'investmentIncome',type: 'currency', sortable: "true" },
    { label: 'Profit', fieldName: 'investmentProfit' ,type: 'currency', sortable: "true"}
];

export default class InvestmentProfit extends NavigationMixin(LightningElement) {
   
    
    getYear = '';
    getmonth = '';

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
    
    
    columns=columns;
    
    isCssLoaded = false
    @track sortBy='investmentMonth';
    @track sortDirection='desc';
    @track getmonth='';
    @track getYear='';

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
   
   
    @wire(getInvestmentProfits,{searchTerm1:'$getmonth',searchTerm2:'$getYear'})
    Investments;

    doSorting(event) 
    {
      this.sortBy = event.detail.fieldName;
      this.sortDirection = event.detail.sortDirection;
      this.sortData(this.sortBy, this.sortDirection);
    }
    sortData(fieldname, direction) 
    {
      let parseData = JSON.parse(JSON.stringify(this.Investments.data));
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
      this.Investments.data = parseData;
    }   
    changeMonth(event)
    {
        this.getmonth=event.detail.value;
    }
    changeYear(event)
    {
        this.getYear=event.detail.value;
    }
    renderedCallback(){ 
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