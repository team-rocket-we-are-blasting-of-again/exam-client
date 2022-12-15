import React, { useEffect, useState } from "react";
import ClaimedTask from "./ClaimedTask";
;

export default function ClaimedDeliveries({ claimedTasks }) {  
 
  return (
    <>
      <br />
      <br />
      <h5>Claimed Deliveries</h5>
      <table>
        <thead>
          <tr>          
            <th>Customer name</th>
            <th>Customer address id</th>
            <th>Order Id</th>
            <th>Drop off</th>
          </tr>
        </thead>
        <tbody>
          {claimedTasks.map((o) => {
            return <ClaimedTask id={o.id} key={o.id} task={o} />;
          })}
        </tbody>
      </table>
    </>
  );
}
