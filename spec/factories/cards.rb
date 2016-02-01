FactoryGirl.define do
  factory :card do
    list
    sequence(:name) { |n| "card-#{n}" }
  end
end
