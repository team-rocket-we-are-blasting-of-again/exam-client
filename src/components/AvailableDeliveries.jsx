import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Task from "./DeliveryTask";

export default function Deliveries({ role_id }) {
  let stompClient;
  const [newDeliveryTasks, setNewDeliveryTasks] = useState([]);
  const [connected, setConnected] = useState(false);

  const connect = () => {
    let Sock = new SockJS("http://localhost:9088/ws");

    stompClient = over(Sock);
    stompClient.connect({ role_id }, onConnected, onError);

    console.log("CONNECTED");
  };
  const onConnected = () => {
    setConnected(true);
    stompClient.subscribe(`/delivery/cph`, onNewDelivery, {
      role_id,
      area: "CPH",
    });
  };

  const onError = (err) => {
    console.log(err);
    setConnected(false);
  };

  const onNewDelivery = (payload) => {
    var tr = JSON.parse(payload.body);
    setNewDeliveryTasks([...tr]);
  };

  useEffect(() => {
    if (!connected) {
      connect();
    }
  }, [connected]);

  return (
    <>
      <br />
      <br />
      <h5>Available Deliveries</h5>
      <table>
        <thead>
          <tr>
            <th>Restaurant name</th>
            <th>Restaurant address id</th>
            <th>Customer name</th>
            <th>Customer address id</th>
            <th>Pick up time:</th>
            <th>Order Id</th>
            <th>Claim</th>
          </tr>
        </thead>
        <tbody>
          {newDeliveryTasks.map((o) => {
            return <Task id={o.id} key={o.id} task={o} />;
          })}
        </tbody>
      </table>
    </>
  );
}
