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

  it "returns 404 for non-existent employee" do
    get "/employees/999999"
    expect(response).to have_http_status(:not_found)
  end

  it "returns 400 for invalid params" do
    post "/employees", params: { employee: { salary: -10 } }
    expect(response).to have_http_status(:bad_request)
  end

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is invalid without full_name" do
    subject.full_name = nil
    expect(subject).not_to be_valid
    expect(subject.errors[:full_name]).to include("can't be blank")
  end

  it "is invalid without job_title" do
    subject.job_title = nil
    expect(subject).not_to be_valid
  end

  it "is invalid without country" do
    subject.country = nil
    expect(subject).not_to be_valid
  end

  it "is invalid without salary" do
    subject.salary = nil
    expect(subject).not_to be_valid
  end

  it "is invalid with zero salary" do
    subject.salary = 0
    expect(subject).not_to be_valid
    expect(subject.errors[:salary]).to include("must be greater than 0")
  end

  it "is invalid with negative salary" do
    subject.salary = -100
    expect(subject).not_to be_valid
  end

  it "accepts large salary values" do
    subject.salary = 1_000_000
    expect(subject).to be_valid
  end

  it "trims whitespace in full_name (if implemented)" do
    subject.full_name = "   Rahul Sharma   "
    subject.valid?
    expect(subject.full_name.strip).to eq("Rahul Sharma")
  end
end

