import React from "react";
import facade from "../ApiFacade";

export default function Task({ task, role_id }) {
  const pickupTime = new Date(task.pickupTime).toString().split(" GMT")[0];
  console.log(role_id);
  const claimTask = (e) => {
    e.preventDefault();
    const request = { deliveryId: task.id };
    facade
      .claimTask(request, role_id)
      .then((d) => {
        console.log(d);        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{task.restaurantName}</td>
      <td>{task.restaurantAddressId}</td>
      <td>{task.customerName}</td>
      <td>{task.dropOffAddressId}</td>
      <td>{pickupTime}</td>
      <td>{task.orderId}</td>
      <td>
        <button onClick={claimTask}>Claim</button>
      </td>
    </tr>
  );
}
