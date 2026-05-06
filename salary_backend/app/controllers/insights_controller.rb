class InsightsController < ApplicationController
  def index
    employees = Employee.all

    employees = employees.where(country: params[:country]) if params[:country].present?
    employees = employees.where(job_title: params[:job_title]) if params[:job_title].present?

    total_employees = employees.count
    min_salary = employees.minimum(:salary)
    max_salary = employees.maximum(:salary)
    avg_salary = employees.average(:salary).to_f.round(2)
    total_salary = employees.sum(:salary)

    headcount_by_country = employees.group(:country).count
    headcount_by_job = employees.group(:job_title).count

    avg_salary_by_country = employees.group(:country).average(:salary)

    top_roles = employees.group(:job_title).average(:salary).sort_by { |_, v| -v }.first(5).to_h

    salary_distribution = {
      "0-50k" => employees.where(salary: 0..50_000).count,
      "50k-100k" => employees.where(salary: 50_001..100_000).count,
      "100k+" => employees.where("salary > ?", 100_000).count
    }

    data = {
      total_employees: total_employees,
      total_salary: total_salary,
      min_salary: min_salary,
      max_salary: max_salary,
      avg_salary: avg_salary,

      headcount_by_country: headcount_by_country,
      headcount_by_job: headcount_by_job,
      avg_salary_by_country: avg_salary_by_country,

      top_roles: top_roles,
      salary_distribution: salary_distribution
    }

    if params[:country].present? && params[:job_title].present?
      job_scope = Employee.where(country: params[:country],job_title: params[:job_title])

      data[:job_title_avg_salary] = job_scope.average(:salary).to_f.round(2)
    end

    render json: data
  end
end