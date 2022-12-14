import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import TransactionBox from "./TransactionBox";
import TransactionPost from "./TransactionPost";

export default function OrderViewer() {
  let stompClient;
  const [validTransactions, setValidTransactions] = useState([]);
  const [invalidTransactions, setInvalidTransactions] = useState([]);
  const [newDeliveryTasks, setNewDeliveryTasks] = useState([]);
  const [connected, setConnected] = useState(false);

  const connect = () => {
    let Sock = new SockJS("http://localhost:9088/ws");
    stompClient = over(Sock);
    stompClient.connect({ role_id: 15 }, onConnected, onError);

    console.log("CONNECTED");
  };

  const onConnected = () => {
    setConnected(true);
    stompClient.subscribe(`/delivery/cph`, onNewDelivery, {
      role_id: 15,
      area: "CPH",
    });
  };

  const onError = (err) => {
    console.log(err);
    setConnected(false);
  };

  const onNewDelivery = (payload) => {
    console.log("New DELIvery:");

    var tr = JSON.parse(payload.body);
    newDeliveryTasks.push(tr);
    setNewDeliveryTasks([...newDeliveryTasks]);
    console.log(payload);
  };
  useEffect(() => {
    if (!connected) {
      connect();
    }
  }, [connected]);

  return (
    <div>
      <TransactionPost />
      <TransactionBox
        list={validTransactions}
        theader={"Valid Transactions"}
        float="left"
      />
      <TransactionBox
        list={invalidTransactions}
        theader={"Invalid Transactions"}
        float="right"
      />
    </div>
  );
}
