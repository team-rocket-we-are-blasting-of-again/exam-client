import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Task from "./DeliveryTask";
import ClaimedDeliveries from "./ClaimedDeliveries";

export default function Deliveries({ role_id }) {
  let stompClient;
  const [newDeliveryTasks, setNewDeliveryTasks] = useState([]);
  const [connected, setConnected] = useState(false);
  const [claimedTasks, setClaimedTasks] = useState([]);
  const role = role_id;
  const token =
    "eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzEyODg1NzMsImV4cCI6MTY3MTMzMTc3MywibmJmIjoxNjcxMjg4NTczLCJyb2xlIjoiQ09VUklFUiIsImlkIjoxfQ.NtGEkxqGdptA9wvoeFCKjWGtB_a8dkvXSZy8MIYTDOPrV4prWINkF7Gv9dzpEuKrARwc344iJ8rUyoLBiC1Nayqf-ZdaBibFofS_Q4wrFvPp8pb3bP9HEBMf-Pw044_15beEyIgLsF8tvyLMnUjvlS_SB07ezlkISt_p_PmpxLqPsDzfLHD5v-_s9hMypxgSlDyjm0vwi327XBowHaZN4nJyqa2DxjXQSasZtrYE1pNpM6g2f58OylAvRD27C6KHd4jjPB34Tn8o-qJfP-weQqPFOk47yZ-KGr79g9J6oA0_lkVXXRkSnBNSAdhYyATtpZJkKMReItZHkCAeFLr2zQ";

  const headers_a = { area: "CPH", role_id, Authorization: token };
  headers_a["x-access-token"] = token;
  const connect = () => {
    let Sock = new SockJS("http://localhost:7788/ws");

    stompClient = over(Sock);

    stompClient.connect(headers_a, onConnected, onError);
  };
  const onConnected = () => {
    console.log("CONNECTED!");

    const headers = { area: "CPH", role_id: role_id, Authorization: token };
    headers["x-access-token"] = token;
    stompClient.subscribe(`/delivery/cph`, onNewDelivery, { ...headers });
    setConnected(true);
  };
  const onError = (err) => {
    console.log(err);
    setConnected(false);
  };

  const onNewDelivery = (payload) => {
    var tr = JSON.parse(payload.body);
    setNewDeliveryTasks([...tr]);
    console.log(tr);
    console.log(newDeliveryTasks);
  };

  const addClaimedtask = (d) => {
    claimedTasks.push(d);
    setClaimedTasks([...claimedTasks]);
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
            {/* <th>Restaurant address id</th> */}
            <th>Customer name</th>
            <th>Customer address id</th>
            <th>Pick up time:</th>
            <th>OrderID</th>
            <th>DeliveryID</th>
          </tr>
        </thead>
        <tbody>
          {newDeliveryTasks.map((o) => {
            return (
              <Task
                id={o.id}
                key={o.id}
                task={o}
                role_id={role}
                addClaimedtask={addClaimedtask}
              />
            );
          })}
        </tbody>
      </table>
      {/* <ClaimedDeliveries claimedTasks={claimedTasks} role_id={role_id} /> */}
    </>
  );
}
