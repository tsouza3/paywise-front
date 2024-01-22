import React from "react";
import PieChart from "../components/filter/piechart.js";
import FilteredExpense from "../components/filter/filteredExpense.js";
import styled from "styled-components";
import Sidebarr from "../components/sidebar/Sidebar";

const Container = styled.section`
  display: flex;
  height: 100vh;
  overflow: hidden; 
`;

const SidebarWrapper = styled.div`
  flex: 0 0 auto;
`;

const ChartAndFilterWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow-y: hidden; 
`;

const PieChartWrapper = styled.div`
  flex: 1;
  padding: 5em;
  max-width: 550px;
  overflow-y: hidden;
`;

const FilterExpenseWrapper = styled.div`
  flex: 1;
  padding: 20px;
  border-left: 1px solid #ccc;
  overflow-y: auto; 
`;

const GastosFiltrados = () => {
  return (
    <Container>
      <SidebarWrapper>
        <Sidebarr />
      </SidebarWrapper>
      <ChartAndFilterWrapper>
        <PieChartWrapper>
          <PieChart />
        </PieChartWrapper>
        <FilterExpenseWrapper>
          <FilteredExpense />
        </FilterExpenseWrapper>
      </ChartAndFilterWrapper>
    </Container>
  );
};

export default GastosFiltrados;
