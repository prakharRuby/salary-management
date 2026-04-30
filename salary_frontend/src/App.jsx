import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [insights, setInsights] = useState({});

  useEffect(() => {
    api.get("/insights", { params: { country: "India" } })
      .then((res) => setInsights(res.data));
  }, []);
    

  useEffect(() => {
    api.get("/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Salary Management Dashboard</h1>
      <div>
        <h3>Insights</h3>
        <p>Min: {insights.min}</p>
        <p>Max: {insights.max}</p>
        <p>Avg: {insights.avg}</p>
      </div>

      {employees.map((emp) => (
        <div key={emp.id}>
          {emp.full_name} - {emp.job_title} - ₹{emp.salary}
        </div>
      ))}
    </div>
  );
}

export default App;