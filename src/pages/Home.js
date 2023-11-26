import React from "react";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import MoneyIcon from "../../src/assets/money.svg";

import HomeBtn from "../components/buttons/HomeBtn";

const Container = styled.section`
  display: flex;
  justify-content: start;
  color: #fff;
  height: 100vh;
  align-items: center;
  background-image: linear-gradient(
    -225deg,
    #3d4e81 0%,
    #5753c9 48%,
    #6e7ff3 100%
  );
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  max-width: 50%;
  margin-left: 2em;
  margin-bottom: 4em;
  font-size: 54px;
  line-height: 58px;
  font-weight: 500;
`;

const Icon = styled.img`
  width: 550px;
  height: 550px;
  margin-bottom: 8em;
  margin-left: 3em;
`;

const SubTitle = styled.p`
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;
`;

function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <Title>
          Empodere seu controle <strong>financeiro.</strong>
          <br />
          <SubTitle>
            Gerencie gastos, receitas e dívidas com a Paywise e assuma o comando
            da sua vida financeira.
          </SubTitle>
          <HomeBtn to="/register" text="Vamos lá" />
        </Title>

        <Icon src={MoneyIcon} alt="Money Icon" />
      </Container>
    </>
  );
}

export default Home;
