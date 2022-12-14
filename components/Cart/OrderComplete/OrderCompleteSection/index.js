import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles'
import Cookies from 'js-cookie'
import { createPayment, updateOrder } from 'utils/api'
import { useSelector } from 'react-redux'

const OrderCompleteSection = ({ cartInfo, billInfo, shipInfo, totalCost, SOnum, orderId }) => {
  const [isPaid, setIsPaid] = useState(0)
  const orderingDate = new Date()
  // const shippingDate = new Date(shipInfo.expectedDeliveryTime)
  const paymentMethodObj = {
    vnpay: 'VN Pay',
    cod: 'Cash on Delivery',
  }

  const userId = useSelector((state) => state.user.id)

  useEffect(() => {
    if (Cookies.get('isPaid')) setIsPaid(Number(JSON.parse(Cookies.get('isPaid'))))
    // setIsPaid()
  }, [])

  const renderPayment = () => {
    const isPaid = Cookies.get('isPaid')
    if (billInfo.paymentMethod === 'vnpay') {
      if (!isPaid || isPaid == 0) {
        return (
          <div className="payment">
            <p className="payment-title">Please click this button to pay</p>
            <div
              className="payment-btn"
              onClick={async () => {
                const resUrl = await createPayment({ orderId, totalCost }).then(({ data: { url } }) => {
                  return url
                })

                window.location.assign(resUrl)
              }}
            >
              <Image src="/vnpay.svg" width={115} height={32} />
            </div>
            <style jsx>{styles}</style>
          </div>
        )
      } else {
        const updateOrderStatus = async () => {
          await updateOrder({ userId, orderId, status: 1 }).then((res) => res.data.listRoom)
        }
        updateOrderStatus()

        return (
          <div className="payment">
            <p className="payment-title">Thank you for complete your payment!</p>
            <style jsx>{styles}</style>
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className="wrapper">
      <div className="row">
        <div className="col-large-7">
          <h1>Order details</h1>
          <div className="row-header">
            <p className="title-cell">Product</p>
            <p className="title-cell">Total</p>
          </div>
          {cartInfo.map((cart) => {
            return (
              <div className="row-cell" key={cart.id}>
                <div className="product">
                  <Link href={`/products/${cart.id}`}>
                    <a>{cart.name}</a>
                  </Link>
                  {' x'} {cart.quantity}
                </div>
                <p className="price">{(cart.price * cart.quantity).toFixed(2)} $</p>
              </div>
            )
          })}
          <div className="row-cell">
            <p className="sub-total">Subtotal</p>
            <p className="sub-price">{Number(totalCost).toFixed(2)} $</p>
          </div>
          <div className="row-cell">
            <p className="shipping">Shipping by</p>
            <div className="method">
              <Image alt="GHN-icon" width="100px" height="60px" src="/images/ghn.png" />
            </div>
          </div>
          <div className="row-cell">
            <p className="shipping-cost">Shipping cost</p>
            <p className="price">{shipInfo} $</p>
          </div>
          <div className="row-cell">
            <p className="total">Total</p>
            <p className="price">{totalCost + shipInfo} $</p>
          </div>
        </div>
        <div className="col-large-5">
          <div className="card">
            <p className="thank-you">Thank you. Your order has been received</p>
            <ul>
              <li>
                Code orders: <span className="id">{SOnum}</span>
              </li>
              <li>
                Order date:{' '}
                <span className="date">
                  {orderingDate.getUTCDate()}/{orderingDate.getUTCMonth() + 1}/{orderingDate.getUTCFullYear()}
                </span>
              </li>
              <li>
                Expected delivery date:{' '}
                <span className="date">
                  {new Date().getUTCDate()}/{new Date().getUTCMonth() + 1}/{new Date().getUTCFullYear()}
                </span>
              </li>
              <li>
                Total: <span className="price">{totalCost + shipInfo} $</span>
              </li>
              <li>
                Payment method: <span className="payment-method">{paymentMethodObj[billInfo.paymentMethod]}</span>
              </li>
            </ul>
            {renderPayment(isPaid)}
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default OrderCompleteSection
