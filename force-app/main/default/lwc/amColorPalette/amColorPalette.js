import { LightningElement,track } from 'lwc';

export default class AmColorPalette extends LightningElement {
    @track colorss;
    selectedColor(event){
        this.colorss=event.target.style;
        alert(this.colorss.background);

    }
}