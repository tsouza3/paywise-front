import React from "react";
import PieChart from "../components/filter/piechart.js";
import FilteredExpense from "../components/filter/filteredExpense.js";
import styled from "styled-components";
import Sidebarr from "../components/sidebar/Sidebar";

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SidebarWrapper = styled.div`
  flex: 0 0 auto;
`;

const ChartAndFilterWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const PieChartWrapper = styled.div`
  flex: 1;
  padding: 5em;
  max-width: 550px;
`;

const FilterExpenseWrapper = styled.div`
  flex: 1;
  padding: 20px; 
  border-left: 1px solid #ccc; /
`;

const GastosFiltrados = () => {
  return (
    <Container>
      <SidebarWrapper>
        <Sidebarr />
      </SidebarWrapper>
      <ContentWrapper>
        <ChartAndFilterWrapper>
          <PieChartWrapper>
            <PieChart />
          </PieChartWrapper>
          <FilterExpenseWrapper>
            <FilteredExpense />
          </FilterExpenseWrapper>
        </ChartAndFilterWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default GastosFiltrados;
