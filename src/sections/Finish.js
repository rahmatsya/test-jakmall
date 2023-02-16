import { FiArrowLeft } from "react-icons/fi";

import {
  Heading1,
  Heading2,
  Row,
  Col,
  SummaryCard,
  BoxSpacing,
  SummaryItem,
} from "./../components";
import { getFee, getEstimation, getLabel, getPaymentLabel } from "../helper";

// METHOD
const getTotal = (shipmentFee, summary) =>
  shipmentFee +
  Object.values(summary)
    .map((summary) => summary.value)
    .reduce((a, b) => a + b) -
  summary.totalItems.value;

// COMPONENT
const Finish = (props) => {
  const data = { ...props.data?.data };
  const shipmentFee = Object.keys(props.summary).includes("shipment")
    ? props.summary.shipment.value
    : getFee(props.data?.data?.shipment) || 0;

  const reset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return data ? (
    <>
      <Row>
        <Col size="9">
          <Row gap>
            
            <Col size="12">
              <BoxSpacing padding="4">
                <Heading1>Thank you</Heading1>
                <p className="font-weight-600">
                  Order ID : {data?.orderId?.toUpperCase()}
                </p>
                <p>
                  Your order will be delivered{" "}
                  {getEstimation(data?.shipment) === "Today"
                    ? getEstimation(data?.shipment)
                    : "in " + getEstimation(data?.shipment)}{" "}
                  by {getLabel(data?.shipment)}
                </p>
                <button
                  onClick={reset}
                  className="font-weight-600"
                  style={{
                    background: "none",
                    border: "none",
                  }}
                >
                  <FiArrowLeft
                    style={{ marginRight: ".5rem", verticalAlign: "middle" }}
                    size={18}
                  />
                  Back To Homepage
                </button>
              </BoxSpacing>
            </Col>

          </Row>
        </Col>
        
        <Col size="3">
          <SummaryCard>
            <div>
              <Heading2>Summary</Heading2>
              <p>{props.summary.totalItems.value} Items Purchased</p>
              {data?.shipment && (
                <SummaryItem
                  label="Delivery Estimation"
                  value={`${getEstimation(data?.shipment)} by ${getLabel(
                    data?.shipment
                  )}`}
                />
              )}
              {data?.payment && (
                <SummaryItem
                  label="Payment Method"
                  value={`${getPaymentLabel(data?.payment)}`}
                />
              )}
            </div>
            <div>
              {Object.keys(props.summary).map((summary) =>
                summary !== "totalItems" ? (
                  <BoxSpacing
                    display="flex"
                    justifyContent="space-between"
                    key={summary + "-summary-items"}
                  >
                    <p>{props.summary[summary].label}</p>
                    <div className="font-weight-600">
                      {props.summary[summary].value.toLocaleString("en-US")}
                    </div>
                  </BoxSpacing>
                ) : (
                  ""
                )
              )}
              {!Object.keys(props.summary).includes("shipment") && (
                <BoxSpacing display="flex" justifyContent="space-between">
                  <p>
                    <b>{getLabel(data?.shipment)}</b> data?.shipment
                  </p>
                  <div className="font-weight-600">
                    {getFee(data?.shipment)?.toLocaleString("en-US")}
                  </div>
                </BoxSpacing>
              )}
              <BoxSpacing display="flex" justifyContent="space-between">
                <Heading2>Total</Heading2>
                <Heading2>
                  {getTotal(shipmentFee, props.summary).toLocaleString("en-US")}
                </Heading2>
              </BoxSpacing>
            </div>
          </SummaryCard>
        </Col>
      </Row>
    </>
  ) : (
    ""
  );
};

export default Finish;
