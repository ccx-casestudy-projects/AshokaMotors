import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class DealerManagementScreen extends NavigationMixin(LightningElement) 
 {
    addDealer()
    {
        let compDefinition = {
            componentDef: "c:dealerQuickComponent",
            attributes: {
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
    editDealer()
    {
        let compDefinition = {
            componentDef: "c:editSearchDealer",
            attributes: {
               
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
    deleteDealer()
    {
        let compDefinition = {
            componentDef: "c:searchDeleteDealerCmp",
            attributes: {
               
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
    
    allDealerDetails()
    {
        let compDefinition = {
            componentDef: "c:allDealerDetailsCmp",
            attributes: {
               
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