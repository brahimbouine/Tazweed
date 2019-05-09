import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    orders: []
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/GetOrders')
      .then(res => {console.log(res.data.Items[0].items);this.setState({ orders: res.data.Items })}
      );

  }
  ConfirnOrder = (id) => {
    this.setState({
      orders: this.state.orders.map(order => {
        if (order.id === id)
          order.completed = !order.completed;
        return order;
      })
    });
  }

  accept(orderId) {
    console.log(orderId)
  }

  refuse(orderId) {
    console.log(orderId)
  }



  render() {
    return (
      <div className="container">
      <img center src='../logo.png'></img>
        {this.state.orders.map((order, key) =>
          <div className="row" key={key}>
            <div className="col-md-12">
            <div className="row">
              <div className='col-md-6'>
                <h4>Order ID : {order.id}</h4>
              </div>
              <div className='col-md-6' style={{marginTop: 15}}>
              <button class="btn btn-success btn-xs pull-right" style={{marginLeft: 5}} onClick={() => this.accept(order.id)}><span class="glyphicon glyphicon-check"></span>Accept</button>
              <button class="btn btn-danger btn-xs pull-right" onClick={() => this.refuse(order.id)}><span class="glyphicon glyphicon-remove-sign"></span>Refuse</button>
              </div>
            </div>
              <div className="table-responsive">
                <table id="mytable" className="table table-bordred table-striped">
                  <thead>
                    <th>Item ID</th>
                    <th>Item Name</th>
                    <th>Item quantity</th>
                    <th>Item price</th>
                  </thead>
                  <tbody>
                    {order.items.map((item, key) =>(
                      <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default App;
