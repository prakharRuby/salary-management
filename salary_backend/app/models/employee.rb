class Employee < ApplicationRecord
    validates :salary, numericality: { greater_than: 0 }
    validates :full_name, :job_title, :country, :salary, presence: true
    validates :email, uniqueness: true, allow_blank: true
end
