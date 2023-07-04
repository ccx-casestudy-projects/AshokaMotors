import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class VehcileManagementScreen extends NavigationMixin(LightningElement) 
{
    addVehicle()
    {
        let compDefinition = {
            componentDef: "c:amVehicleMainCmp",
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

    addQuickVehicle()
    {
        let compDefinition = {
            componentDef: "c:quickVehicleMainCmp",
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

    editVehicle()
    {
        let compDefinition = {
            componentDef: "c:searchEditVehicleCmp",
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

    deleteVehicle()
    {
        let compDefinition = {
            componentDef: "c:searchDeleteVehicleCmp",
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
    repairVehicle()
    {
        let compDefinition = {
            componentDef: "c:searchAddRepairsCmp",
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
    allVehicles()
    {
        let compDefinition = {
            componentDef: "c:vehicleManagement",
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