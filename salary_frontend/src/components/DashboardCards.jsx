function DashboardCards({ insights }) {
  const card = {
    background: "white",
    padding: "18px",
    borderRadius: "12px",
    minWidth: "180px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    fontWeight: "600"
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "20px"
      }}
    >
      <div style={card}>Total<br />{insights.total_employees || 0}</div>
      <div style={card}>Min Salary<br />{insights.min_salary || 0}</div>
      <div style={card}>Max Salary<br />{insights.max_salary || 0}</div>
     <div style={card}>
            Job Avg Salary<br />
            {insights.job_title_avg_salary || "-"}
            </div>
    </div>
  );
}

export default DashboardCards;