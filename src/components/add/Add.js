import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Loader from "../loading/loader";
import AddBtn from "../buttons/AddBtn";

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
  padding-inline: 20em;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const Form = styled.form`
  height: 60%;
  background-color: #fff;
  padding: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow:
    0 15px 15px -3px rgba(0, 0, 0, 0.1),
    0 8px 8px -2px rgba(0, 0, 0, 0.05);
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
  background-color: #fff;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: calc(100% - 2rem);
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const SubmitButton = styled.button``;

const ButtonContainer = styled.div`
  display: flex;
`;
const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [add, setAdd] = useState({
    valor: "",
    categoria: "",
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
        window.location.reload();
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

        <AddBtn onclick={""} text="Nova despesa" />
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
              />
            </InputContainer>

            <InputContainer>
              <Input
                type="text"
                placeholder="Categoria"
                value={add.categoria}
                onChange={(e) => setAdd({ ...add, categoria: e.target.value })}
              />
            </InputContainer>

            <InputContainer>
              <Input
                type="text"
                placeholder="Descrição"
                value={add.descricao}
                onChange={(e) => setAdd({ ...add, descricao: e.target.value })}
              />
            </InputContainer>

            {addError && <p style={{ color: "red" }}>{addError}</p>}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? <Loader /> : "Adicionar entrada"}
            </SubmitButton>
          </Form>
        </ModalContent>
      </ModalBackground>
    </div>
  );
};

export default Add;
