FactoryGirl.define do
  factory :list do
    board
    sequence(:name) { |n| "list-#{n}" }
  end
end
