import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Login from "./Login";
import Order from "./Order";

export default function OrderViewer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [restaurantId, setRestaurantId] = useState(null);
  const [newOrders, setNewOrders] = useState([]);
  const [a, setA] = useState(0);
  let stompClient;

  const connect = () => {
    console.log(restaurantId);

    let Sock = new SockJS("http://localhost:7799/ws");
    stompClient = over(Sock);
    stompClient.connect({ role_id: restaurantId }, onConnected, onError);
  };
  const registerRestaurant = (id) => {
    console.log(id);
    setRestaurantId(id);
    setIsLoggedIn(true);
    //  connect();
  };
  useEffect(() => {
    if (isLoggedIn) {
      connect();
    }
  }, [isLoggedIn]);

  const onConnected = () => {
    stompClient.subscribe(
      `/restaurant/${restaurantId}/new-orders`,
      onNewOrder,
      { role_id: restaurantId }
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onNewOrder = (payload) => {
    // var order = JSON.parse(payload.body);
    // console.log(order);
    // newOrders.push(order);
    // setNewOrders(newOrders);
    let orders = JSON.parse(payload.body);
    console.log(orders);
    orders.forEach((element) => {
      console.log(element);
    });
    setNewOrders([...orders]);

    console.log(newOrders);
    //  setA(orders[0].id);
  };

  return (
    <div className="order-box">
      <h2>Restaurant Overview</h2> <br />
      {isLoggedIn ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>With delivery</th>
              <th>Total Price</th>
              <th>Items:</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {newOrders.map((o) => {
              return <Order key={o.id} id={o.id} order={o} />;
            })}
          </tbody>
        </table>
      ) : (
        <Login registerRestaurant={registerRestaurant} />
      )}
    </div>
  );
}
