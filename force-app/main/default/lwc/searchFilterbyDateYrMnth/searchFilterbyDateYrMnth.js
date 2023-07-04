import { LightningElement } from 'lwc';

export default class SearchFilterbyDateYrMnth extends LightningElement {
   
    value = 'years';

    get options() {
        return [
            { label: '2010', value: '2010'},
            { label: '2011', value: '2011' },
            { label: '2012', value: '2012' },
            { label: '2013', value: '2013' },
            { label: '2014', value: '2014' },
            { label: '2015', value: '2015' },
            { label: '2016', value: '2016' },
            { label: '2017', value: '2017' },
            { label: '2018', value: '2018' },
            { label: '2019', value: '2019' },
            { label: '2020', value: '2020' },
            { label: '2021', value: '2021' },
            { label: '2022', value: '2022' },
            { label: '2023', value: '2023' },
        ];

        
    }

    YearhandleChange(event) {
        this.Year = event.detail.value;
    }
value='Months';
    get options() {
      return [
          { label: '1', value: 'January'},
          { label: '2', value: 'February' },
          { label: '3', value: 'March' },
          { label: '4', value: 'April' },
          { label: '5', value: 'May' },
          { label: '6', value: 'June' },
          { label: '7', value: 'July' },
          { label: '8', value: 'August' },
          { label: '9', value: 'September' },
          { label: '10', value: 'October	' },
          { label: '11', value: 'November' },
          { label: '12', value: 'December' },
                ];
                


}
MonthhandleChange(event){
    this.Month=event.target.value;
}
    value='Days';
    get options(){
        return[
            { label: '1', value: '1'},
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
          { label: '6', value: '6' },
          { label: '7', value: '7' },
          { label: '8', value: '8' },
          { label: '9', value: '9' },
          { label: '10', value: '10	' },
          { label: '11', value: '11' },
          { label: '12', value: '12' },
          { label: '1', value: '13'},
          { label: '2', value: '14' },
          { label: '3', value: '15' },
          { label: '4', value: '16' },
          { label: '5', value: '17' },
          { label: '6', value: '18' },
          { label: '7', value: '19' },
          { label: '8', value: '20' },
          { label: '9', value: '21' },
          { label: '10', value: '22	' },
          { label: '11', value: '23' },
          { label: '12', value: '24' },
          { label: '1', value: '25'},
          { label: '2', value: '26' },
          { label: '3', value: '27' },
          { label: '4', value: '28' },
          { label: '5', value: '29' },
          { label: '6', value: '30' },
          { label: '7', value: '31' },
        ];
    }
    DatehandleChange(event){
        this.date=event.target.value;

}

}