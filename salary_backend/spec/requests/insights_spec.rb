require 'rails_helper'

RSpec.describe "Insights API", type: :request do
  describe "GET /insights" do
    it "returns salary stats for a given country" do
      Employee.create!(full_name: "A", job_title: "Engineer", country: "India", salary: 10000)
      Employee.create!(full_name: "B", job_title: "Engineer", country: "India", salary: 30000)

      get "/insights", params: { country: "India" }

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(json["min"]).to eq(10000)
      expect(json["max"]).to eq(30000)
      expect(json["avg"]).to eq(20000)
    end
  end
  it "returns average salary for job title in a country" do
    Employee.create!(full_name: "A", job_title: "Engineer", country: "India", salary: 10000)
    Employee.create!(full_name: "B", job_title: "Engineer", country: "India", salary: 30000)

    get "/insights", params: { country: "India", job_title: "Engineer" }

    json = JSON.parse(response.body)

    expect(json["avg"]).to eq(20000)
  end
end