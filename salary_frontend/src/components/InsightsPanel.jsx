import React from "react";

function InsightsPanel({ insights }) {
  if (!insights) return null;

  const card = {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    flex: 1,
    minWidth: "180px",
  };

  const section = {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginTop: "20px",
  };

  return (
    <div>
      {/* 🔹 TOP SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <div style={card}>
          <h4>Total Employees</h4>
          <h2>{insights.total_employees}</h2>
        </div>

        <div style={card}>
          <h4>Avg Salary</h4>
          <h2>₹ {Math.round(insights.avg_salary || 0)}</h2>
        </div>

        <div style={card}>
          <h4>Min Salary</h4>
          <h2>₹ {insights.min_salary}</h2>
        </div>

        <div style={card}>
          <h4>Max Salary</h4>
          <h2>₹ {insights.max_salary}</h2>
        </div>

        <div style={card}>
          <h4>Total Salary Spend</h4>
          <h2>₹ {insights.total_salary}</h2>
        </div>
      </div>

      {/* 🔹 HEADCOUNT BY COUNTRY */}
      <div style={section}>
        <h3>Headcount by Country</h3>
        {Object.entries(insights.headcount_by_country || {}).map(
          ([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          )
        )}
      </div>

      {/* 🔹 HEADCOUNT BY JOB */}
      <div style={section}>
        <h3>Headcount by Job Title</h3>
        {Object.entries(insights.headcount_by_job || {}).map(
          ([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          )
        )}
      </div>

      {/* 🔹 TOP ROLES */}
      <div style={section}>
        <h3>Top Paying Roles</h3>
        {Object.entries(insights.top_roles || {}).map(([role, salary]) => (
          <div key={role}>
            {role}: ₹ {Math.round(salary)}
          </div>
        ))}
      </div>

      {/* 🔹 SALARY DISTRIBUTION */}
      <div style={section}>
        <h3>Salary Distribution</h3>
        {Object.entries(insights.salary_distribution || {}).map(
          ([range, count]) => (
            <div key={range}>
              {range}: {count} employees
            </div>
          )
        )}
      </div>

      {/* 🔹 AVG SALARY BY COUNTRY */}
      <div style={section}>
        <h3>Avg Salary by Country</h3>
        {Object.entries(insights.avg_salary_by_country || {}).map(
          ([country, salary]) => (
            <div key={country}>
              {country}: ₹ {Math.round(salary)}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default InsightsPanel;