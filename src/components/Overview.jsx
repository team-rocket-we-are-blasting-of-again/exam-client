import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CourierOverview from "./courier/CourierOverview";
import OrderViewer from "./restaurant/OrderViewer";

export default function Overview() {
  return (
    <Container>
      <Row>
        {/* <Col id="CustomerOverviewCol">
          <CustomerOverview />
        </Col> */}
        <Col id="RestaurantOverviewCol">
          <OrderViewer />
        </Col>
        <Col id="CourierOverviewCol">
          <CourierOverview />
        </Col>
      </Row>
    </Container>
  );
}
