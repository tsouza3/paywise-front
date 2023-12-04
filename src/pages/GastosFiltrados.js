import React from "react";
import PieChart from "../components/filter/piechart.js";

import styled from "styled-components";

import Sidebarr from "../components/sidebar/Sidebar";

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ContentWrapper = styled.div`
  height: 70vh;
`;

const SidebarWrapper = styled.div`
  flex: 0 0 auto;
`;

const GastosFiltrados = () => {
  return (
    <Container>
      <SidebarWrapper>
        <Sidebarr />
      </SidebarWrapper>

      <ContentWrapper>
        <PieChart />
      </ContentWrapper>
    </Container>
  );
};

export default GastosFiltrados;
