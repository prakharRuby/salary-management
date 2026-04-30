import api from "../services/api";

function EmployeeTable({ employees, refresh, onEdit }) {
  const deleteEmployee = async (id) => {
    if (window.confirm("Delete this employee?")) {
      await api.delete(`/employees/${id}`);
      refresh();
    }
  };

  const btn = {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "6px"
  };

  return (
    <div
      style={{
        background: "white",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        overflowX: "auto"
      }}
    >
      <table width="100%" cellPadding="12" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f1f3f5", textAlign: "left" }}>
            <th>Name</th>
            <th>Title</th>
            <th>Country</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={emp.id}
              style={{
                borderBottom: "1px solid #eee",
                background: index % 2 === 0 ? "#fff" : "#fafafa"
              }}
            >
              <td>{emp.full_name}</td>
              <td>{emp.job_title}</td>
              <td>{emp.country}</td>
              <td>{emp.salary}</td>
              <td>
                <button
                  style={{ ...btn, background: "#1976d2", color: "white" }}
                  onClick={() => onEdit(emp)}
                >
                  Edit
                </button>

                <button
                  style={{ ...btn, background: "#d32f2f", color: "white" }}
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;