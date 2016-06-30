'use strict';

class Records extends React.Component{
  constructor(props){
    super();

    // bindings 
    this.addRecord = this.addRecord.bind(this)
    this.updateRecord = this.updateRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
    this.credits = this.credits.bind(this)
    this.debits = this.debits.bind(this)
    this.balance = this.balance.bind(this)

    // default state
    this.state = {
      records: props.data
    }
  }

  addRecord(record){
    const records = React.addons.update(this.state.records, {$push: [record]})
    this.setState({records: records})
  }

  updateRecord(record, data){
    const index = this.state.records.indexOf(record)
    const records = React.addons.update(this.state.records, {$splice: [[index, 1, data]]})
    this.setState({records: records})
  }

  deleteRecord(record){
    const index = this.state.records.indexOf(record)
    const records = React.addons.update(this.state.records, {$splice: [[index, 1]]})
    this.setState({records: records})
  }

  credits(){
    return this.state.records
      .filter((record) => {return record.amount >= 0})
      .reduce((previous, current) => {return previous + parseFloat(current.amount)}, 0)
  }

  debits(){
    return this.state.records
      .filter((record) => {return record.amount < 0})
      .reduce((previous, current) => {return previous + parseFloat(current.amount)}, 0)
  }

  balance(){
    return this.credits() + this.debits()
  }

  render(){
    const records = this.state.records.map((record) => {
      return <Record key={record.id} record={record} handleDeleteRecord={this.deleteRecord} handleEditRecord={this.updateRecord}/>
    })

    return (
      <div className="records container-fluid">
        <h2 className="title">Records</h2>

        <hr/>

        <AmountBox text="Credits" type="success" amount={this.credits()} />
        <AmountBox text="Debits" type="warning" amount={this.debits()} />
        <AmountBox text="Balance" type="info" amount={this.balance()} />

        <RecordForm handleNewRecord={this.addRecord}/>

        <hr/>

        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records}
          </tbody>
        </table>
      </div>
    )
  }
}
