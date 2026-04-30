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
    render json: Employee.all
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

  private

  def employee_params
    params.require(:employee).permit(:full_name, :job_title, :country, :salary)
  end
end