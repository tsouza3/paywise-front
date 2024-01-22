import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Loader from "../loading/loader";
import AddBtn from "../buttons/AddBtn";
import SubmitButton from "../buttons/SubmitButton";
import { IoCloseSharp } from "react-icons/io5";

import AddExpense from "./addExpense";

const ModalBackground = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding-inline: 3em;
  height: 50vh;
  border-radius: 10px;
`;

const CloseButton = styled(IoCloseSharp)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  size: 30px;
  color: #5753c9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 60%;
  background-color: #fff;
  padding: 2rem;
  width: 100%;
  border-radius: 0.5rem;
  margin-top: 1em;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 1em;
  outline: none;
  overflow: hidden;
  background-color: #f3f3f3;
  border-radius: 10px;
  transition: all 0.5s;

  &:hover,
  &:focus {
    border: 2px solid #3d4e81;
    box-shadow: 0px 0px 0px 7px rgba(87, 83, 201, 20%);
    background-color: white;
  }
`;

const SubmitButtonContainer = styled.div`
  margin-top: 0.5em;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Add = ({atualizarSaldo}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [add, setAdd] = useState({
    valor: "",
    descricao: "",
  });

  const [addError, setAddError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    console.log("Token obtido:", token);
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setAddError("");
    setAdd({
      valor: "",
      descricao: "",
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    try {
      const valorNumerico = parseFloat(add.valor);

      const response = await axios.post(
        "http://localhost:3006/api/users/add/entrada",
        { ...add, valor: valorNumerico },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        handleCloseModal();
        atualizarSaldo(valorNumerico);
      }
    } catch (error) {
      setAddError("Erro ao adicionar");
      console.error("Erro ao adicionar", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ButtonContainer>
        <AddBtn onclick={handleOpenModal} text="Nova entrada" />
        <AddExpense />
      </ButtonContainer>
      <ModalBackground isOpen={isOpen}>
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <Form onSubmit={handleAdd}>
            <InputContainer>
              <Input
                type="number"
                placeholder="Valor"
                value={add.valor}
                onChange={(e) => setAdd({ ...add, valor: e.target.value })}
                style={{ borderColor: addError ? "red" : "" }}
              />
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                placeholder="Descrição"
                value={add.descricao}
                onChange={(e) => setAdd({ ...add, descricao: e.target.value })}
                style={{ borderColor: addError ? "red" : "" }}
              />
            </InputContainer>
            <SubmitButtonContainer>
              <SubmitButton type="submit" disabled={loading} text="Adicionar">
                {loading ? <Loader /> : ""}
              </SubmitButton>
            </SubmitButtonContainer>
          </Form>
        </ModalContent>
      </ModalBackground>
    </div>
  );
};

export default Add;
