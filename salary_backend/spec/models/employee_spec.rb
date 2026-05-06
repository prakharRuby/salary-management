require 'rails_helper'

RSpec.describe Employee, type: :model do
  subject do
    described_class.new(
      full_name: "John Doe",
      job_title: "Engineer",
      country: "India",
      salary: 50000
    )
  end

  # -----------------------------
  # VALIDATIONS
  # -----------------------------

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is invalid without full_name" do
    subject.full_name = nil
    expect(subject).not_to be_valid
    expect(subject.errors[:full_name]).to include("can't be blank")
  end

  it "is invalid without job_title" do
    subject.job_title = nil
    expect(subject).not_to be_valid
  end

  it "is invalid without country" do
    subject.country = nil
    expect(subject).not_to be_valid
  end

  it "is invalid without salary" do
    subject.salary = nil
    expect(subject).not_to be_valid
  end

  it "is invalid with zero salary" do
    subject.salary = 0
    expect(subject).not_to be_valid
    expect(subject.errors[:salary]).to include("must be greater than 0")
  end

  it "is invalid with negative salary" do
    subject.salary = -100
    expect(subject).not_to be_valid
  end

  # -----------------------------
  # EDGE CASES
  # -----------------------------

  it "accepts large salary values" do
    subject.salary = 1_000_000
    expect(subject).to be_valid
  end

  it "trims whitespace in full_name (if implemented)" do
    subject.full_name = "   John Doe   "
    subject.valid?
    expect(subject.full_name.strip).to eq("John Doe")
  end
end