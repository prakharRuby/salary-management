class CreateEmployees < ActiveRecord::Migration[7.2]
  def change
    create_table :employees do |t|
      t.string :full_name
      t.string :email
      t.string :job_title
      t.string :country
      t.integer :salary
      t.string :department
      t.date :hire_date
      t.string :status

      t.timestamps
    end
  end
end
