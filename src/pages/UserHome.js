import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Add from "../components/add/Add";
import SidebarExample from "../components/sidebar/Sidebar";

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
  background-image: linear-gradient(
    -225deg,
    #3d4e81 0%,
    #5753c9 48%,
    #6e7ff3 100%
  );
`;

const TextWrapper = styled.div`
  margin: 2em;
  padding-inline: 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 2em;
  margin-left: 3em;
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

  return (
    <HomeContainer>
      <SidebarWrapper>
        <SidebarExample />
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
            {saldo !== null ? <h1>R$ {saldo}</h1> : null}
          </TextWrapper>
        </ContentWrapper>

        <ButtonWrapper>
          <Add />
        </ButtonWrapper>
      </MainContent>
    </HomeContainer>
  );
};

export default UserHome;
