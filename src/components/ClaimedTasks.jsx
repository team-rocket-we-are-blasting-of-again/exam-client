import React from "react";

export default function Task({ task }) {
  const pickupTime = new Date(task.pickupTime).toString().split(" GMT")[0];

  return (
    <tr>
      <td>{task.restaurantName}</td>
      <td>{task.restaurantAddressId}</td>
      <td>{task.customerName}</td>
      <td>{task.dropOffAddressId}</td>
      <td>{pickupTime}</td>
      <td>{task.orderId}</td>
      <td>
        <button>Drop off</button>
      </td>
    </tr>
  );
}
