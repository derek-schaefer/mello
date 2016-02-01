describe User do
  context 'validations' do
    subject { build(:user, password: nil) }
    it { expect(subject).to validate_presence_of(:email) }
    it { expect(subject).to validate_uniqueness_of(:email) }
    it { expect(subject).to validate_presence_of(:username) }
    it { expect(subject).to validate_uniqueness_of(:username) }
    it { expect(subject).to validate_presence_of(:password) }
    it { expect(subject).to validate_presence_of(:password_digest) }
  end
end
