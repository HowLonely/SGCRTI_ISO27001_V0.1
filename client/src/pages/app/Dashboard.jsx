import { RiskMatrix } from "../../components/RiskMatrix/RiskMatrix";

export const Dashboard = () => {
  const data = [
    //Impacto ->
    ["A", "A", "R", "R", "R"], 
    ["V", "A", "A", "R", "R"],
    ["V", "A", "A", "R", "R"], 
    ["V", "V", "A", "A", "R"],
    ["V", "V", "V", "A", "A"] //Frecuencia 

  ];
  return (
    <>
      <h1>DASHBOARD</h1>
      <RiskMatrix data={data} />
    </>
  );
};
