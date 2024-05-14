import { Container, Grid, Paper, Text } from "@mantine/core";

// Función para renderizar una celda
const renderCell = (value) => (
  <Paper style={{ padding: 30 }}>
    <Text>{value}</Text>
  </Paper>
);

// Función para generar una fila de celdas
const renderRow = (rowData, key) => (
  <Grid key={key} gutter="xl" justify="center">
    {rowData.map((value, index) => (
      <Grid key={index} xs={0} style={{ textAlign: "center" }}>
        {renderCell(value)}
      </Grid>
    ))}
  </Grid>
);

// Función para generar todas las filas
const renderRows = (data) => data.map((rowData, index) => renderRow(rowData, index));

// Componente RiskMatrix parametrizado
export const RiskMatrix = ({ data }) => (
  <Container size={"xl"}>
    {renderRows(data)}
  </Container>
);

