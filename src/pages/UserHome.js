import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import backgroundImage from "../assets/wave.svg";

import Add from "../components/add/Add";
import Sidebarr from "../components/sidebar/Sidebar";

const HomeContainer = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
`;

const SidebarWrapper = styled.div`
  flex: 0 0 auto;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  font-size: 2rem;
  font-family: inherit;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #fff;
  height: 50vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
`;

const TextWrapper = styled.div`
  margin: 2em;
  padding-inline: 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 2em;
  margin-top: -2em;
`;

const UserHome = ({ token }) => {
  const [saldo, setSaldo] = useState(null);
  const [name, setName] = useState(null);

  

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:3006/api/users/saldo",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          setSaldo(response.data.saldo);
          setName(response.data.name);
        }
      } catch (error) {
        console.error("Erro ao buscar o saldo:", error);
      }
    };

    fetchSaldo();
  }, [token]);

  const atualizarSaldo = (valorAdicionado) => {
    setSaldo((prevSaldo) => prevSaldo + valorAdicionado);
  };

  return (
    <HomeContainer>
      <SidebarWrapper>
        <Sidebarr />
      </SidebarWrapper>

      <MainContent>
        <ContentWrapper>
          <TextWrapper>
            {name !== null ? (
              <p>
                Olá,{" "}
                <strong>
                  {name.trim().split(" ")[0].charAt(0).toUpperCase() +
                    name.trim().split(" ")[0].slice(1)}
                </strong>
              </p>
            ) : null}
            {saldo !== null ? <h1>$ {saldo}</h1> : null}
          </TextWrapper>

          <ButtonWrapper>
            <Add atualizarSaldo={atualizarSaldo} />
          </ButtonWrapper>
        </ContentWrapper>
      </MainContent>
    </HomeContainer>
  );
};

export default UserHome;
