FactoryGirl.define do
  factory :board do
    sequence(:name) { |n| "board-#{n}" }
  end
end
