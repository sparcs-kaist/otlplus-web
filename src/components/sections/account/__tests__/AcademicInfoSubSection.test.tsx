import { renderWithQueryClient, sampleUser } from '@/test-utils';
import AcademicInfoSubSection from '../AcademicInfoSubSection';
import nock from 'nock';

test('renders AcademicInfoSubSection', async () => {
  renderWithQueryClient(<AcademicInfoSubSection />);
});

test('renders contact mail, student id', async () => {
  nock('http://localhost').get('/session/info').reply(200, sampleUser);
  const { findByTestId, findByText } = renderWithQueryClient(<AcademicInfoSubSection />);
  const contact = await findByTestId('contact-mail');
  expect(contact.textContent).toBe('otlplus@sparcs.org');
  const studentId = await findByText('20210378');
  expect(studentId).toBeTruthy();
});
