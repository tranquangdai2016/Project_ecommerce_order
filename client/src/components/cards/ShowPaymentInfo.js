import React from 'react'

const ShowPaymentInfo = ({ order, showStatus }) => (
  <div>
    <p>
      <span>Order Id: {order._id}</span>c{' / '}
      <span>
        Amount :{' '}
        {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
      {' / '}
      <span>Currency : {order.paymentIntent.currency.toUpperCase()}</span>
      {' / '}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {' / '}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {' / '}
      <span>
        Orderd on: {' / '}
        {new Date(order.paymentIntent.created).toLocaleString()}
      </span>
      {' / '}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">STATUS: {order.orderStatus}</span>
      )}
    </p>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Phone</th>
            <th scope="col">Địa chỉ nhận hàng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default ShowPaymentInfo
