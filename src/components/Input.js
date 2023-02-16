import { useState } from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { COLOR } from "../helper/contants";

const InputStyle = (p) => `
padding: ${p.isFocused ? "1.65rem .85rem .85rem .85rem" : "1.25rem .85rem"};
width: 100%;
&:focus {
  outline: none;
  box-shadow: none;
}
`;

const InputTextStyled = styled.input`
  ${(p) => InputStyle(p)}
`;

const InputTextAreaStyled = styled.textarea`
  ${(p) => InputStyle(p)}
`;

const InputCheckStyled = styled.input`
position: relative;
height: 18px;
  &:before{
    content: "";
    display: block;
    background-color: #fff;
    height: 15px;
    width: 15px;
    border: 2px solid #ccc;
  }
  &:checked:before{
    background-color: #e0f4ea;
    border: 2px solid ${COLOR.SUCCESS};

  }
  &:checked:after {
    content: "";
    display: block;
    width: 5px;
    height: 10px;
    border: solid ${COLOR.SUCCESS};
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 2px;
    left: 6px;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
  & > p {
    margin-top: 0;
    opacity: 0.4;
  }
  & > input,
  & > textarea {
    font-family: "Inter", sans-serif;
    border: ${(p) =>
      p.error
        ? "1px solid " + COLOR.PRIMARY
        : p.success
        ? "1px solid " + COLOR.SUCCESS
        : "1px solid #cccccc"};
  }
  & > label {
    opacity: ${(p) => (p.error || p.success ? "1" : ".4")};
    color: ${(p) =>
      p.error ? COLOR.PRIMARY : p.success ? COLOR.SUCCESS : "unset"};
  }
`;

const InputCheckContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    justify-content: start;
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  position: ${(p) => (p.animateLabel ? "absolute" : "relative")};
  left: ${(p) => (p.animateLabel ? "0.85rem" : "0")};
  top: ${(p) => (p.animateLabel ? (p.isFocused ? "10px" : "1.15rem") : 0)};
  opacity: ${(p) => (p.animateLabel ? "0.4" : "1")};
  font-size: ${(p) => (p.isFocused ? "12px" : "16px")};
  transition: 0.2s;
`;

const InputRadioContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 80%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OptionContainer = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  & > label > div {
    background-color: ${(p) => (p.isChecked ? "#1BD97B1b" : "unset")};
    border: 3px solid ${(p) => (p.isChecked ? "#1BD97B" : "unset")};
  }
`;

const InputRadioStyled = styled.input`
  flex: 0;
  visibility: hidden;
  position: absolute;
`;

const OptionBox = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
  & > p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  & > span {
    font-weight: 600;
  }
`;

const InputText = ({ name, label, field, type, errors }) => {
  const [isFocused, setFocused] = useState(field.value || false);
  return (
    <InputContainer
      error={errors?.hasOwnProperty(name)}
      success={field.value && !errors?.hasOwnProperty(name)}
    >
      <Label htmlFor={name} isFocused={isFocused} animateLabel={true}>
        {label}
      </Label>
      <InputTextStyled
        {...field}
        value={field.value || ""}
        inputRef={field.ref}
        type={type}
        name={name}
        id={name}
        isFocused={isFocused}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(field.value || false);
          field.onBlur();
        }}
      />
    </InputContainer>
  );
};

const InputTextArea = ({ name, label, field, withCounter, errors }) => {
  const [isFocused, setFocused] = useState(field.value || false);
  return (
    <InputContainer
      error={errors?.hasOwnProperty(name)}
      success={field.value && !errors?.hasOwnProperty(name)}
    >
      <Label htmlFor={name} isFocused={isFocused} animateLabel={true}>
        {label}
      </Label>
      <InputTextAreaStyled
        {...field}
        name={name}
        id={name}
        isFocused={isFocused}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(field.value || false);
          field.onBlur();
        }}
      />
      {withCounter && <p>{field?.value?.length || 0} / 120</p>}
    </InputContainer>
  );
};

const InputCheck = ({ name, label, field, type }) => {
  return (
    <InputCheckContainer>
      <InputCheckStyled
        {...field}
        type={type}
        name={name}
        id={name}
        checked={field.value}
      />
      <Label htmlFor={name} isFocused={false}>
        {label}
      </Label>
    </InputCheckContainer>
  );
};

const InputRadio = ({ name, label, field, type, options }) => {
  return (
    <InputRadioContainer>
      {options.map((option) => (
        <OptionContainer
          key={option.value + "-input-radio-payment"}
          isChecked={field.value === option.value}
        >
          <InputRadioStyled
            {...field}
            type={type}
            name={name}
            id={option.value}
            value={option.value}
          />
          <label htmlFor={option.value}>
            <OptionBox>
              <p>{option.label}</p>
              <span>
                {option.fee
                  ? option.fee?.toLocaleString("en-US")
                  : option.balance
                  ? option.balance?.toLocaleString("en-US") + " left"
                  : " "}
              </span>
            </OptionBox>
          </label>
        </OptionContainer>
      ))}
    </InputRadioContainer>
  );
};

const Input = ({ field, ...p }) => {
  return (
    <Controller
      name={p.name}
      control={p.control}
      rules={p.rules}
      errors={p.errors}
      render={({ field }) =>
        p.type === "textarea" ? (
          <InputTextArea {...p} field={field} />
        ) : p.type === "checkbox" ? (
          <InputCheck {...p} field={field} />
        ) : p.type === "radio" ? (
          <InputRadio {...p} field={field} />
        ) : (
          <InputText {...p} field={field} />
        )
      }
    />
  );
};

export default Input;
