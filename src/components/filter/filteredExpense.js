import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
overflow-y: auto;
`;

const Select = styled.select`
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 1em;
  outline: none;
  overflow: hidden;
  background-color: #f3f3f3;
  border-radius: 10px;
  transition: all 0.5s;
  border: 2px solid #3d4e81;

  &:hover,
  &:focus {
    border: 2px solid #3d4e81;
    box-shadow: 0px 0px 0px 7px rgba(87, 83, 201, 20%);
    background-color: white;
  }
`;

const Option = styled.option``;

const Li = styled.li`
  border-radius: 5px;
  margin-top: 5px;
  display: flex;
  align-items: center;
`;

const Ul = styled.ul`
  font-family: Poppins, "sans-serif";
  font-weight: 400;
  list-style: none;
`;

const InputContainer = styled.div`
  height: 80px;
  padding-left: 1em;
`;
const Wrapper = styled.div`

  display: flex;
  margin: 1em;

`;

const Line = styled.hr`
border: none; 
height: 3px; 
background-color: #3D4E70; 

`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;

  color: #3D4E70;
`;

const OtherDataContainer = styled.div`
  flex: 1;
  padding: 2em;
`;

const Category = styled.p`
color: #3D4E70;

`

const FilteredExpense = () => {
  const [gastos, setGastos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("lazer");
  const [prazoSelecionado, setPrazoSelecionado] = useState("");


  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );

  const categoryTranslations = {
    alimentacao: "Alimentação",
    moradia: "Moradia",
    lazer: "Lazer",
    entretenimento: "Entretenimento",
    saude: "Saúde",
    vestuario: "Vestuário",
    transporte: "Transporte",
    educacao: "Educação",
    poupanca: "Poupança",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let url = `http://localhost:3006/api/users/gastos/${categoriaSelecionada}`;

      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      );

      if (prazoSelecionado === "7d") {
        url += "?dias=7";
      } else if (prazoSelecionado === "15d") {
        url += "?dias=15";
      } else if (prazoSelecionado === "30d") {
        url += "?dias=30";
      }

      console.log(url, prazoSelecionado);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

        const formattedData = response.data.entradas.map((item) => {
          const createdAt = new Date(item.createdAt);

          const formattedDate = `${createdAt
            .toLocaleString("default", { month: "short" })
            .toUpperCase()} ${createdAt.getDate()}`;

          return {
            ...item,
            categoria:
              categoryTranslations[item.categoria.toLowerCase()] ||
              item.categoria,
            createdAt: formattedDate,
          };
        });

        setGastos(formattedData);
      } catch (error) {
        console.error("Erro ao buscar gastos por categoria:", error);
      }
    }

    fetchData();
  }, [categoriaSelecionada, token]);

  return (
    <Container>
      <Wrapper>
        <InputContainer>
          <Select onChange={(e) => setPrazoSelecionado(e.target.value)}
            value={prazoSelecionado}>
            <Option value="">Filtrar por prazo</Option>
            <Option value="7d">7 Dias</Option>
            <Option value="15d">15 Dias </Option>
            <Option value="30d">30 Dias</Option>
          </Select>
        </InputContainer>

        <InputContainer>
          <Select
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            value={categoriaSelecionada}
          >
            <Option value="">Selecione uma categoria</Option>
            <Option value="moradia">Moradia</Option>
            <Option value="lazer">Lazer</Option>
            <Option value="entretenimento">Entretenimento</Option>
            <Option value="alimentacao">Alimentação</Option>
            <Option value="saude">Saúde</Option>
            <Option value="vestuario">Vestuário</Option>
            <Option value="transporte">Transporte</Option>
            <Option value="educacao">Educação</Option>
            <Option value="poupanca">Poupança</Option>
          </Select>
        </InputContainer>
      </Wrapper>
      <Ul>
        {gastos.slice().reverse().map((gasto, index) => (
          <Li key={index}>
            <DateContainer>
              <strong>
                <p>{gasto.createdAt}</p>
              </strong>
            </DateContainer>
            <OtherDataContainer>
              <p style={{ color: "red" }}>{`$ ${gasto.valor}`}</p>
              <strong>
                <Category>{gasto.categoria}</Category>
              </strong>
              <p>Descrição: {gasto.descricao}</p>
              <Line />
            </OtherDataContainer>
          </Li>
        ))}
      </Ul>
    </Container>
  );
};

export default FilteredExpense;
