FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "user-#{n}@mello" }
    sequence(:username) { |n| "user-#{n}" }
    password 'supersecure'
  end
end
