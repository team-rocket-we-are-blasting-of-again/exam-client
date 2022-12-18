import React from "react";

export default function Order({ order }) {
  console.log(order);
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.status}</td>
      <td>{order.withDelivery ? "Delivery" : "Selv pickup"}</td>
      <td>{order.totalPrice}</td>
      <td>
        {order.items.map((i) => {
          return <p id={i.id}> {i.quantity + " X " + i.name} </p>;
        })}
      </td>
      <td>{order.createdAt}</td>
    </tr>
  );
}
