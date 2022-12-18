import React from "react";
import facade from "../../ApiFacade";

export default function ClaimedTask({ task, role_id, updateClaimedTasks }) {
  const dropTask = (e) => {
    e.preventDefault();
    const request = { deliveryId: task.id };
    facade
      .claimOrDropTask(request, role_id, "drop")
      .then((d) => {
        console.log(d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{task.customerName}</td>
      <td>{task.dropOffAddressId}</td>
      <td>{task.orderId}</td>
      <td>
        <button onClick={dropTask}>Drop off</button>
      </td>
    </tr>
  );
}
