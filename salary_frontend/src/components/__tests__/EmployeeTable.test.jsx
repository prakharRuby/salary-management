import { render, screen } from "@testing-library/react";
import EmployeeTable from "../EmployeeTable";
import '@testing-library/jest-dom';
import EmployeeForm from "../EmployeeForm";

describe("EmployeeTable", () => {
  const mockEmployees = [
    {
      id: 1,
      full_name: "John Doe",
      job_title: "Engineer",
      country: "India",
      salary: 50000,
    },
  ];

  test("renders employee data", () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        refresh={() => {}}
        onEdit={() => {}}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
  });

  test("shows empty state when no employees", () => {
    render(
      <EmployeeTable
        employees={[]}
        refresh={() => {}}
        onEdit={() => {}}
      />
    );

    expect(screen.getByText(/no employees/i)).toBeInTheDocument();
  });

  test("renders action buttons", () => {
    render(
        <EmployeeTable
        employees={mockEmployees}
        refresh={() => {}}
        onEdit={() => {}}
        />
    );

    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    });

    describe("EmployeeForm", () => {
  it("renders form when open", () => {
    render(
      <EmployeeForm
        open={true}
        setOpen={() => {}}
        employee={null}
        refresh={() => {}}
      />
    );

    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });
});
});