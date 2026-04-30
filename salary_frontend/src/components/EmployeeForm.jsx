import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@mui/material";

function EmployeeForm({ refresh, employee, open, setOpen }) {
  const emptyForm = {
    full_name: "",
    email: "",
    job_title: "",
    country: "",
    salary: ""
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (employee) {
      setForm(employee);
    } else {
      setForm(emptyForm);
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async () => {
    if (employee?.id) {
      await api.put(`/employees/${employee.id}`, {
        employee: form
      });
    } else {
      await api.post("/employees", {
        employee: form
      });
    }

    setOpen(false);
    refresh();
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {employee ? "Edit Employee" : "Add Employee"}
        </DialogTitle>

        <DialogContent>
          <TextField fullWidth margin="dense" name="full_name" label="Full Name" value={form.full_name} onChange={handleChange} />
          <TextField fullWidth margin="dense" name="email" label="Email" value={form.email} onChange={handleChange} />
          <TextField fullWidth margin="dense" name="job_title" label="Job Title" value={form.job_title} onChange={handleChange} />
          <TextField fullWidth margin="dense" name="country" label="Country" value={form.country} onChange={handleChange} />
          <TextField fullWidth margin="dense" name="salary" label="Salary" value={form.salary} onChange={handleChange} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submitForm}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeForm;