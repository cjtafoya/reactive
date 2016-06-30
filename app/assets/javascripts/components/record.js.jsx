'use strict';

class Record extends React.Component{
  constructor(){
    super()
    
    // bindings
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.recordRow = this.recordRow.bind(this)
    this.recordForm = this.recordForm.bind(this)

    this.state = {
      edit: false
    }
  }

  handleEdit(event){
    event.preventDefault()
    let data = {
      title: this.title.value,
      date: this.date.value,
      amount: this.amount.value
    }
    $.ajax({
      method: 'PUT',
      url: `/records/${this.props.record.id}`,
      dataType: 'JSON',
      data: {record:  data},
      success: (result) => {
        this.setState({edit: false}),
        this.props.handleEditRecord(this.props.record, result)
      }
    })
  }
  
  handleDelete(event){
    event.preventDefault()
    $.ajax({
      method: 'DELETE',
      url: `/records/${this.props.record.id}`,
      dataType: 'JSON'
    }).done(() => 
      this.props.handleDeleteRecord(this.props.record)
    )
  }

  handleToggle(event){
    event.preventDefault()
    this.setState({edit: !this.state.edit})
  }

  recordRow(){
    var {date, title, amount} = this.props.record;
    return(
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{amountFormat(amount)}</td>
        <td>
          <button className="btn btn-warning" action="Edit" onClick={this.handleToggle}>Edit</button>
          <span> </span>
          <button className="btn btn-danger" action="Delete" onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  }

  recordForm(){
    var {date, title, amount} = this.props.record;
    return(
      <tr>
        <td>
          <input type="text" className='form-control' defaultValue={date} ref={(ref) => this.date = ref} />
        </td>
        <td>
          <input type="text" className='form-control' defaultValue={title} ref={(ref) => this.title = ref} />
        </td>
        <td>
          <input type="number" className='form-control' defaultValue={amount} ref={(ref) => this.amount = ref} />
        </td>
        <td>          
          <button className="btn btn-default" onClick={this.handleEdit}>Update</button>
          <button className="btn btn-default" onClick={this.handleToggle}>Cancel</button>
        </td>
      </tr>
    )
  }

  render(){ 
    return this.state.edit ? this.recordForm() : this.recordRow()
  }
}