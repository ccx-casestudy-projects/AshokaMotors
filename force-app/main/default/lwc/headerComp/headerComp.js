import { LightningElement, track} from 'lwc';
import imageUrl from '@salesforce/resourceUrl/AshokaMotorsLogo';

export default class HeaderComp extends LightningElement {
    @track imageUrl1=imageUrl;
}