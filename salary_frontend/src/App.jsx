import { useEffect, useState } from "react";
import api from "./services/api";

import DashboardCards from "./components/DashboardCards";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";

function App() {

  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [insights, setInsights] = useState({});

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);


  const [country, setCountry] = useState("");
  const [job, setJob] = useState("");

  const perPage = 10;

  const load = async () => {
    const emp = await api.get("/employees");

    const insight = await api.get("/insights", {
      params: {
        country,
        job_title: job
      }
    });

    setEmployees(emp.data);
    setFiltered(emp.data);
    setInsights(insight.data);
  };

  useEffect(() => {
    load();
  }, [country, job]);

  useEffect(() => {
    if (!search) {
      setFiltered(employees);
      return;
    }

    const res = employees.filter((e) =>
      e.full_name.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(res);
    setPage(1);
  }, [search, employees]);

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const visible = filtered.slice(start, end);

  const totalPages = Math.ceil(filtered.length / perPage);

  const openAdd = () => {
    setEditEmployee(null);
    setOpenForm(true);
  };

  const openEdit = (emp) => {
    setEditEmployee(emp);
    setOpenForm(true);
  };

  return (
    <div style={{ padding: "20px", background: "#f5f7fb", minHeight: "100vh" }}>
      <h2>Salary Dashboard</h2>

      <DashboardCards insights={insights} />

      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
        <input
          placeholder="Search employee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>

        <select value={job} onChange={(e) => setJob(e.target.value)}>
          <option value="">Job</option>
          <option value="Engineer">Engineer</option>
          <option value="Manager">Manager</option>
        </select>

        <button onClick={openAdd}>Add</button>
      </div>

      <EmployeeTable
        employees={visible}
        onEdit={openEdit}
        refresh={load}
      />

      <div style={{ marginTop: 10 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <EmployeeForm
        open={openForm}
        setOpen={setOpenForm}
        employee={editEmployee}
        refresh={load}
      />
    </div>
  );
}

export default App;