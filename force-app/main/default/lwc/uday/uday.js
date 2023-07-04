import { LightningElement, track } from 'lwc';

export default class Example extends LightningElement {
  @track records = [
    { Id: '001', Name: 'Record 1', isSelected: false },
    { Id: '002', Name: 'Record 2', isSelected: false },
    { Id: '003', Name: 'Record 3', isSelected: false },
  ];

  handleClick(event) {
    const selectedRecordId = event.target.value;
    const selectedRecord = this.records.find(record => record.Id === selectedRecordId);

    // Toggle the isSelected property of the selected record
    selectedRecord.isSelected = !selectedRecord.isSelected;

    // Log the updated record in the console
    console.log('Updated selected record:', selectedRecord);

    // Force the template to re-render
    this.records = [...this.records];
  }
}