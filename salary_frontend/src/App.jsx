import { useEffect, useState } from "react";
import api from "./services/api";

import DashboardCards from "./components/DashboardCards";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  const [employees, setEmployees] = useState([]);
  const [insights, setInsights] = useState({});
  const [meta, setMeta] = useState({});

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const [countries, setCountries] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [country, setCountry] = useState("");
  const [job, setJob] = useState("");

  // ✅ LOAD EMPLOYEES + INSIGHTS
  const load = async () => {
    try {
      const params = { page };

      if (search) params.search = search;
      if (country) params.country = country;
      if (job) params.job_title = job;

      const emp = await api.get("/employees", { params });

      const insight = await api.get("/insights", {
        params: { country, job_title: job },
      });

      setEmployees(emp.data.data || []);
      setMeta(emp.data.meta || {});
      setInsights(insight.data || {});
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  // ✅ LOAD METADATA (ONLY ONCE)
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const metaData = await api.get("/metadata");
        setCountries(metaData.data.countries || []);
        setJobs(metaData.data.job_titles || []);
      } catch (err) {
        console.error("Metadata error:", err);
      }
    };

    loadMeta();
  }, []);

  // ✅ LOAD DATA WHEN FILTERS CHANGE
  useEffect(() => {
    load();
  }, [page, search, country, job]);

  const openAdd = () => {
    setEditEmployee(null);
    setOpenForm(true);
  };

  const openEdit = (emp) => {
    setEditEmployee(emp);
    setOpenForm(true);
  };

  const totalPages = Math.ceil(
    (meta?.total || 0) / (meta?.per_page || 10)
  );

  return (
    <div style={{ padding: "20px", background: "#f5f7fb", minHeight: "100vh" }}>
      <h2>Salary Dashboard</h2>

      <DashboardCards insights={insights} />

      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
        <input
          placeholder="Search employee"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={country}
          onChange={(e) => {
            setPage(1);
            setCountry(e.target.value);
          }}
        >
          <option value="">Country</option>
          {countries?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={job}
          onChange={(e) => {
            setPage(1);
            setJob(e.target.value);
          }}
        >
          <option value="">Job</option>
          {jobs?.map((j) => (
            <option key={j} value={j}>
              {j}
            </option>
          ))}
        </select>

        <button onClick={openAdd}>Add</button>
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={openEdit}
        refresh={load}
      />

      <div style={{ marginTop: 10 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
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