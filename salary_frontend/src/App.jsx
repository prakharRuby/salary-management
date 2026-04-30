import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [insights, setInsights] = useState({});
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    api.get("/insights", { params: { country: "India" } })
      .then((res) => setInsights(res.data));
  }, []);
    

  useEffect(() => {
    api.get("/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  useEffect(() => {
    api.get("/metadata").then((res) => {
      setCountries(res.data.countries);
    });
  }, []);

  useEffect(() => {
  api.get("/insights", { params: { country } })
    .then((res) => setInsights(res.data));
}, [country]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Salary Management Dashboard</h1>
      <div>
        <h3>Insights</h3>
        <p>Min: {insights.min}</p>
        <p>Max: {insights.max}</p>
        <p>Avg: {insights.avg}</p>
      </div>
    <select value={country} onChange={(e) => setCountry(e.target.value)}>
      <option value="">All Countries</option>
      {countries.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
      {employees.map((emp) => (
        <div key={emp.id}>
          {emp.full_name} - {emp.job_title} - ₹{emp.salary}
        </div>
      ))}
    </div>
  );
}

export default App;