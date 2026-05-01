require 'rails_helper'

RSpec.describe "Insights API", type: :request do
  describe "GET /insights" do
    before do
      Employee.create!(full_name: "A", job_title: "Engineer", country: "India", salary: 10000)
      Employee.create!(full_name: "B", job_title: "Engineer", country: "India", salary: 30000)
    end

    it "returns salary stats for a given country" do
      get "/insights", params: { country: "India" }

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(json["min_salary"]).to eq(10000)
      expect(json["max_salary"]).to eq(30000)
      expect(json["avg_salary"]).to eq(20000)
    end

    it "returns average salary for a job title within a country" do
      get "/insights", params: { country: "India", job_title: "Engineer" }

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(json["avg_salary"]).to eq(20000)
    end
  end
end