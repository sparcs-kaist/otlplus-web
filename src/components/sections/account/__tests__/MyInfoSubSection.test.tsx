import { renderWithQueryClient } from '@/test-utils';
import MyInfoSubSection from '../MyInfoSubSection';

test('renders MyInfoSubSection', async () => {
  renderWithQueryClient(<MyInfoSubSection />);
});
