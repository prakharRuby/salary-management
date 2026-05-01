require 'rails_helper'

RSpec.describe "Employees API", type: :request do
  describe "POST /employees" do
    it "creates an employee" do
      post "/employees", params: {
        employee: {
          full_name: "Rahul Sharma",
          job_title: "Engineer",
          country: "India",
          salary: 50000
        }
      }

      expect(response).to have_http_status(:created)
    end
  end

  describe "GET /employees" do
    it "returns list of employees" do
      Employee.create!(full_name: "Jane Doe", job_title: "HR", country: "India", salary: 40000)

      get "/employees"

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to eq(1)
    end
  end

  describe "PUT /employees/:id" do
    it "updates an employee" do
      emp = Employee.create!(full_name: "A", job_title: "Engineer", country: "India", salary: 10000)

      put "/employees/#{emp.id}", params: {
        employee: { salary: 20000 }
      }

      expect(response).to have_http_status(:ok)
      expect(emp.reload.salary).to eq(20000)
    end
  end

  describe "DELETE /employees/:id" do
    it "deletes employee" do
      emp = Employee.create!(full_name: "A", job_title: "Engineer", country: "India", salary: 10000)

      delete "/employees/#{emp.id}"

      expect(response).to have_http_status(:no_content)
      expect(Employee.exists?(emp.id)).to be false
    end
  end

end

