import React from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../assets/add.svg";

const Button = styled.button`
  position: relative;
  width: 180px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #3d4e81;
  background-image: linear-gradient(
    -225deg,
    #3d4e81 0%,
    #5753c9 48%,
    #6e7ff3 100%
  );
  margin-right: 1.5em;
  border-radius: 10px;

  transition: all 0.3s;

  &:hover {
    background-image: linear-gradient(
      -225deg,
      #3d4e81 0%,
      #5753c9 48%,
      #6e7ff3 100%
    );
  }

  &:hover .ButtonText {
    color: transparent;
  }

  &:hover .ButtonIcon {
    width: 175px;
    transform: translateX(0);
  }

  &:active .ButtonIcon {
    background-color: #5753c9;
  }

  &:active {
    border: 1px solid #5753c9;
  }
`;

const ButtonText = styled.span`
  transform: translateX(10px);
  color: #fff;
  font-weight: 600;
  transition: all 0.3s;
  font-family: "Poppins", sans-serif;
`;

const ButtonIcon = styled.span`
  position: absolute;
  transform: translateX(123px);
  height: 100%;
  width: 52px;
  background-color: #3d4e81;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border-radius: 10px;

  svg {
    width: 30px;
    stroke: #fff;
  }
`;

const AddBtn = ({ text, onclick }) => {
  return (
    <Button onClick={onclick}>
      <ButtonText className="ButtonText">{text}</ButtonText>
      <ButtonIcon className="ButtonIcon">
        <AddIcon />
      </ButtonIcon>
    </Button>
  );
};

export default AddBtn;
