describe Card do
  context 'associations' do
    it { expect(subject).to belong_to(:list) }
    it { expect(subject).to have_one(:board).through(:list) }
  end

  context 'validations' do
    subject { build(:card) }
    it { expect(subject).to validate_presence_of(:list) }
    it { expect(subject).to validate_presence_of(:name) }
    it { expect(subject).to validate_uniqueness_of(:name).scoped_to(:list_id) }
  end
end
