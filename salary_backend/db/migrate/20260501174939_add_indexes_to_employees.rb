class AddIndexesToEmployees < ActiveRecord::Migration[7.2]
  def change
    add_index :employees, :country
    add_index :employees, :job_title
    add_index :employees, [:country, :job_title]
  end
end
