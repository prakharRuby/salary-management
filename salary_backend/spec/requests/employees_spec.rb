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
end

describe "GET /employees" do
  it "returns list of employees" do
    Employee.create!(full_name: "Jane Doe", job_title: "HR", country: "India", salary: 40000)

    get "/employees"

    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body).length).to eq(1)
  end
end

