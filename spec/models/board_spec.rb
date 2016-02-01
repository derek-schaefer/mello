describe Board do
  context 'associations' do
    it { expect(subject).to have_many(:lists).dependent(:destroy) }
    it { expect(subject).to have_many(:cards).through(:lists) }
  end

  context 'validations' do
    subject { build(:board) }
    it { expect(subject).to validate_presence_of(:name) }
    it { expect(subject).to validate_uniqueness_of(:name) }
  end
end
