import React from 'react'

const ShowPaymentInfo = ({ order, showStatus }) => (
  <div className="card text-center">
    <div className="card-body">
      <div className="card-title">
        <span>
          <b>Order Id: </b>
          {order._id} -
        </span>
        <b className="ml-2">
          {order.isPaid && <span className="text-success">Đã thanh toán</span>}
          {!order.isPaid && <span className="text-danger">Chưa thanh toán</span>}
        </b>
      </div>
      <p>
        <span>
          Amount :{' '}
          <b>
            {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'VND',
            })}
          </b>
        </span>
        {' / '}
        <span>
          Currency : <b>{order.paymentIntent.currency.toUpperCase()}</b>
        </span>
        {' / '}
        <span>
          Method: <b>{order.paymentIntent.payment_method_types[0]}</b>
        </span>
        {' / '}
        <span>
          Payment: <b>{order.paymentIntent.status.toUpperCase()}</b>
        </span>
        {' / '}
        <span>
          Orderd on:
          <b>{new Date(order.paymentIntent.created).toLocaleString()}</b>
        </span>
        <br />
        {showStatus && (
          <span className="badge bg-primary text-white">STATUS: {order.orderStatus}</span>
        )}
      </p>
      <hr />
      <div className="text-left">
        <b>ID: </b>{' '}
        <span>
          <i>{order.addressId && order.addressId._id}</i>
        </span>
        <br />
        <b>Tên khách hàng: </b>{' '}
        <span>
          <i>{order.addressId && order.addressId.name}</i>
        </span>
        <br />
        <b>Địa chỉ nhận hàng: </b>{' '}
        <span>
          <i>{order.addressId && order.addressId.receiveAddress}</i>
        </span>
        <br />
        <b>Số điện thoại: </b>{' '}
        <span>
          <i>{order.addressId && order.addressId.phone}</i>
        </span>
      </div>
    </div>
  </div>
)

export default ShowPaymentInfo
