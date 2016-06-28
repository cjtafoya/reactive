'use strict';

class Records extends React.Component{
  constructor(props){
    super();
    this.addRecord = this.addRecord.bind(this)
    this.state = {
      records: props.data
    }
  }

  addRecord(record){
    const records = React.addons.update(this.state.records, {$push: [record]})
    this.setState({records: records})
  }

  render(){
    var records = this.state.records.map((record) => {
      return <Record key={record.id} record={record} />
    })

    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <RecordForm handleNewRecord={this.addRecord}/>
        <hr/>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
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
