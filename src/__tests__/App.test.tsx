import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import App from '../renderer/App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;

describe('App', () => {
  const config = {
    address: { server: '127.0.0.1', ws: '127.0.0.1' },
  };
  const handlers = {
    onScreenSelect: () => ({}),
  };

  it('should render', async () => {
    await waitFor(() => {
      expect(render(<App conf={config} handlers={handlers} />)).toBeTruthy();
    });
  });
});
