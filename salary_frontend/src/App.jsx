import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [insights, setInsights] = useState({});
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  // Load employees + countries on mount
  useEffect(() => {
    api.get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Employees error:", err));

    api.get("/metadata")
      .then((res) => setCountries(res.data.countries))
      .catch((err) => console.error("Metadata error:", err));
  }, []);

  // Load insights when country changes
  useEffect(() => {
    const params = country ? { country } : {};

    api.get("/insights", { params })
      .then((res) => setInsights(res.data))
      .catch((err) => console.error("Insights error:", err));
  }, [country]);

  return (
    
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto",  padding: "20px",fontFamily: "Arial" }}>
      <h1>Salary Management Dashboard</h1>

      {/* Country Filter */}
      <div style={{ marginBottom: "20px" }}>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Insights */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Insights</h3>
        <p>Min: {insights?.min ?? "-"}</p>
        <p>Max: {insights?.max ?? "-"}</p>
        <p>Avg: {insights?.avg ?? "-"}</p>
      </div>

      {/* Employees List */}
      <div>
        <h3>Employees</h3>
        {employees.length === 0 ? (
          <p>No employees found</p>
        ) : (
          employees.map((emp) => (
            <div key={emp.id}>
              {emp.full_name} - {emp.job_title} - ₹{emp.salary}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;