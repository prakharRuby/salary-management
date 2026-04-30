def index
  employees = Employee.where(country: params[:country])

  if params[:job_title].present?
    employees = employees.where(job_title: params[:job_title])
  end

  render json: {
    min: employees.minimum(:salary),
    max: employees.maximum(:salary),
    avg: employees.average(:salary).to_f
  }
end