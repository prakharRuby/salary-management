# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
first_names = File.readlines(Rails.root.join("first_names.txt"), chomp: true)
last_names  = File.readlines(Rails.root.join("last_names.txt"), chomp: true)

job_titles = ["Engineer", "Manager", "HR", "Designer"]
countries = ["India", "USA", "UK", "Canada"]

10_000.times do
  Employee.create!(
    full_name: "#{first_names.sample} #{last_names.sample}",
    job_title: job_titles.sample,
    country: countries.sample,
    salary: rand(30000..150000)
  )
end