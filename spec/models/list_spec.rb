describe List do
  context 'associations' do
    it { expect(subject).to belong_to(:board) }
    it { expect(subject).to have_many(:cards).dependent(:destroy) }
  end

  context 'validations' do
    subject { build(:list) }
    it { expect(subject).to validate_presence_of(:board) }
    it { expect(subject).to validate_presence_of(:name) }
    it { expect(subject).to validate_uniqueness_of(:name).scoped_to(:board_id) }
  end
end
