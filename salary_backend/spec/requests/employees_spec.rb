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