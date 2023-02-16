import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  Heading1,
  Heading2,
  Input,
  Row,
  Col,
  SummaryCard,
  BoxSpacing,
  Button,
} from "./../components";

// METHOD //
const getTotal = (summary) => 
  Object.values(summary)
    .map((v) => v.value)
    .reduce((a, b) => a + b) -
  summary.totalItems.value

// COMPONENT //
const Delivery = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      sendAsDropshipper: true,
    },
  });

  const sendAsDropshipperValue = useWatch({
    control,
    name: "sendAsDropshipper",
  });

  useEffect(() => {
    if (!sendAsDropshipperValue) {
      props.setSummary({
        ...props.summary,
        dropshippingFee: {
          ...props.summary.dropshippingFee,
          value: 0,
        },
      });
    } else {
      props.setSummary({
        ...props.summary,
        dropshippingFee: {
          ...props.summary.dropshippingFee,
          value: 5900,
        },
      });
    }
  }, [sendAsDropshipperValue]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (!data.sendAsDropshipper) {
      delete data.dropshipperName;
      delete data.dropshipperPhoneNumber;
    }
    props.continueForm(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "4rem" }}>
        <Row>
          <Col size="9">
            <Row gap>
             
              <Col size="6">
                <Heading1>Delivery Details</Heading1>
              </Col>
              
              <Col size="6">
                <BoxSpacing margin="2">
                  <Input
                    type="checkbox"
                    name="sendAsDropshipper"
                    label="Send As Dropshipper"
                    control={control}
                  />
                </BoxSpacing>
              </Col>
              
              <Col size="6">
                <Input
                  type="text"
                  name="email"
                  label="Email"
                  control={control}
                  errors={errors}
                  rules={{
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  }}
                />
                <Input
                  type="text"
                  name="phoneNumber"
                  label="Phone Number"
                  rules={{
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^[0-9\-+() ]+$/,
                  }}
                  errors={errors}
                  control={control}
                />
                <Input
                  type="textarea"
                  name="address"
                  label="Address"
                  control={control}
                  errors={errors}
                  withCounter
                  rules={{
                    required: true,
                    maxLength: 120,
                  }}
                />
              </Col>
             
              <Col size="6">
                {sendAsDropshipperValue && (
                  <>
                    <Input
                      type="text"
                      name="dropshipperName"
                      label="Dropshipper Name"
                      control={control}
                      errors={errors}
                      rules={{
                        required: true,
                        maxLength: 50,
                      }}
                    />
                    <Input
                      type="text"
                      name="dropshipperPhoneNumber"
                      label="Dropshipper Phone Number"
                      control={control}
                      errors={errors}
                      rules={{
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /^[0-9\-+() ]+$/,
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
          </Col>

          <Col size="3">
            <SummaryCard>
              <div>
                <Heading2>Summary</Heading2>
                <p>{props.summary.totalItems.value} Items Purchased</p>
              </div>
              <div>
                {Object.keys(props.summary).map((v) =>
                  v !== "totalItems" ? (
                    <BoxSpacing
                      display="flex"
                      justifyContent="space-between"
                      key={v + "-summary-items"}
                    >
                      <p>{props.summary[v].label}</p>
                      <div className="font-weight-600">
                        {props.summary[v].value.toLocaleString("en-US")}
                      </div>
                    </BoxSpacing>
                  ) : (
                    ""
                  )
                )}

                <BoxSpacing display="flex" justifyContent="space-between">
                  <Heading2>Total</Heading2>
                  <Heading2>
                    {getTotal(props.summary).toLocaleString("en-US")}
                  </Heading2>
                </BoxSpacing>
                <Button type="submit">Continue To Payment</Button>
                
              </div>
            </SummaryCard>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default Delivery;
