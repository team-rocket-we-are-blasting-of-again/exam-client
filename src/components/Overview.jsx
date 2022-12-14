import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CourierOverview from "./CourierOverview";

export default function Overview() {
  return (
    <Container>
      <Row id="title">dvsadsalb</Row>
      <Row>
        <Col id="CustomerOverviewCol">Customer</Col>
        <Col id="RestaurantOverviewCol">Restaurant</Col>
        <Col id="CourierOverviewCol">
          <CourierOverview />
        </Col>
      </Row>
    </Container>
  );
}

