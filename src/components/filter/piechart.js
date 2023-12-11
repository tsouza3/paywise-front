import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const ChartAndLegendContainer = styled.div`
  display: flex;
`;

const ChartContainer = styled.div`
  width: 50%;
  height: 50%;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Poppins, "sans-serif";
  color: #333333;
  margin-left: 3.5em;
  margin-top: 0.7em;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background-color: ${({ color }) => color};
`;

const PieChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  ChartJS.register(ArcElement, Tooltip, Legend);

  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );

  const categorias = [
    "lazer",
    "alimentacao",
    "saude",
    "moradia",
    "vestuario",
    "transporte",
    "educacao",
    "poupanca",
    "entretenimento",
  ];

  const categoriass = [
    "Lazer",
    "Alimentação",
    "Saúde",
    "Moradia",
    "Vestuário",
    "Transporte",
    "Educação",
    "Poupança",
    "Entretenimento",
  ];

  const cores = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 153, 170, 0.2)",
    "rgba(79, 134, 247, 0.2)",
    "rgba(255, 217, 102, 0.2)",
    "rgba(0, 204, 153, 0.2)",
  ];

  const hoverCores = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 153, 170, 1)",
    "rgba(79, 134, 247, 1)",
    "rgba(255, 217, 102, 1)",
    "rgba(0, 204, 153, 1)",
  ];

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    async function fetchDataForAllCategories() {
      try {
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const dataPorCategoria = await Promise.all(
            categorias.map(async (categoria) => {
              const respostaCategoria = await axios.get(
                `http://localhost:3006/api/users/gastos/${categoria}`,
                config,
              );
              return respostaCategoria.data;
            }),
          );

          const labels = categoriass;
          const valores = dataPorCategoria.map((item) => item.valorTotalGasto);
          const datasets = [
            {
              data: valores,
              backgroundColor: cores,
              hoverBackgroundColor: hoverCores,
              borderColor: hoverCores,
              borderWidth: 1,
            },
          ];

          setData({
            labels,
            datasets,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchDataForAllCategories();
  }, [token]);

  return (
    <ChartAndLegendContainer>
      <ChartContainer>
        <Pie data={data} options={chartOptions} type="pie" />
      </ChartContainer>

      <LegendContainer>
        {data.labels.map((label, index) => (
          <LegendItem key={index}>
            <LegendColor color={cores[index]} />
            <span>{label}</span>
          </LegendItem>
        ))}
      </LegendContainer>
    </ChartAndLegendContainer>
  );
};

export default PieChart;
