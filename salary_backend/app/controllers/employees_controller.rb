class EmployeesController < ApplicationController
  def create
    employee = Employee.new(employee_params)

    if employee.save
      render json: employee, status: :created
    else
      render json: { errors: employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    employees = Employee.page(params[:page]).per(10)

    render json: {
      data: employees,
      meta: {
        page: params[:page].to_i,
        total: employees.total_count
      }
    }
  end

  def show
    @employee = Employee.find_by(id:params[:id])
    return head :not_found unless @employee
    render json: @employee
  end

  def update
    @employee = Employee.find_by(id:params[:id])
    return head :not_found unless @employee
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: { errors: @employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @employee = Employee.find_by(id:params[:id])
    return head :not_found unless @employee
    @employee.destroy
    head :no_content
  end

  def metadata
    render json: {
        countries: Employee.distinct.pluck(:country),
        job_titles: Employee.distinct.pluck(:job_title)
    }
  end

  private

  def employee_params
    params.require(:employee).permit(:full_name, :job_title, :country, :salary)
  end
end