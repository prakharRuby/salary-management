import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Salary Management Dashboard</h1>

      {employees.map((emp) => (
        <div key={emp.id}>
          {emp.full_name} - {emp.job_title} - ₹{emp.salary}
        </div>
      ))}
    </div>
  );
}

export default App;