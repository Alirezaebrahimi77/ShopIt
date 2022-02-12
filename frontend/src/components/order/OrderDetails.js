import React, {Fragment, useEffect} from 'react'
import {Link, useParams} from "react-router-dom"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../action/orderActions";

const OrderDetails = () => {
    const { id } = useParams();
    const alert = useAlert()
    const dispatch = useDispatch()

    const {loading, error, order} = useSelector(state => state.orderDetails)
    // const {shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus} = order

    

    useEffect(() => {
        dispatch(getOrderDetails(id))

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, id])


    return (
        <Fragment>
            <MetaData title={"Order Details"} />
            {loading ? <Loader /> :
               
                
                    <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Order # {order && order._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {order.user && order.user.name}</p>
                        <p><b>Phone:</b> {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}</p>
                        <p><b>Amount:</b> ${order && order.totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment</h4>
                        <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"} ><b>{order.paymentInfo && order.paymentInfo.status === "succeeded"  ? "PAID" : "NOT PAID"}</b></p>


                        <h4 className="my-4">Order Status:</h4>
                        <p className={order && String(order.orderStatus).includes("Delivered") ? "greenColor" : "redColor"} ><b>{order && order.orderStatus}</b></p>


                        <h4 className="my-4">Order Items:</h4>

                        <hr />
                        <div className="cart-item my-1">
                            {order.orderItems && order.orderItems.map((item, index) => (
                                <div className="row my-5" key={index}>
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.quantity} Piece(s)</p>
                                </div>
                            </div>

                            ))}
                                    
                        </div>
                        <hr />
                    </div>
                </div>

                
            
            
            }

      
            
        </Fragment>
    )
}

export default OrderDetails
