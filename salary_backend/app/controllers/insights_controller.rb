class InsightsController < ApplicationController
  def index
    employee = Employee.all
    employee = employee.where(country: params[:country]) if params[:country].present?

    data = {total_employees: employee.count,min_salary: employee.minimum(:salary),max_salary: employee.maximum(:salary),avg_salary: employee.average(:salary).to_f.round(2)}

    if params[:country].present? && params[:job_title].present?
      job_scope = Employee.where(country: params[:country], job_title: params[:job_title])
      data[:job_title_avg_salary] = job_scope.average(:salary).to_f.round(2)
    end

    render json: data
  end
end