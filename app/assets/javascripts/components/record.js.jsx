'use strict';

class Record extends React.Component{
  render(){ 
    var {date, title, amount} = this.props.record;
    return(
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{amountFormat(amount)}</td>
      </tr>
    )
  }
}