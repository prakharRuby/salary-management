class Employee < ApplicationRecord
    validates :email, uniqueness: true, allow_blank: true
    validates :full_name, presence: true
    validates :job_title, presence: true
    validates :country, presence: true
    validates :salary, presence: true,
                        numericality: { greater_than: 0 }
end
