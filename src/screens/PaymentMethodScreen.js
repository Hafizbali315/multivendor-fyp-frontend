import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {
	const navigate = useNavigate()
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart
	if (!shippingAddress.address) {
		navigate('/shipping')
	}
	const [paymentMethod, setPaymentMethod] = useState('Card')
	const dispatch = useDispatch()
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		navigate('/placeorder')
	}
	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Payment Method</h1>
				</div>

				<div>
					<div>
						<input
							type="radio"
							id="cash"
							value="cash"
							name="paymentMethod"
							required
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></input>
						<label htmlFor="cash">Cash On Delivery</label>
					</div>
				</div>

				<div>
					<div>
						<input
							type="radio"
							id="card"
							value="Card"
							name="paymentMethod"
							required
							onChange={(e) => setPaymentMethod(e.target.value)}
						></input>
						<label htmlFor="card">Master Card or Debit Card</label>
					</div>
				</div>

				<div>
					<label />
					<button className="primary" type="submit">
						Continue
					</button>
				</div>
			</form>
		</div>
	)
}
