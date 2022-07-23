import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  // Test if the component renders without crashing
  it('Should have a content hello world  ', () => {
    const divElement = screen.getByText('hello world');
    expect(divElement).toBeInTheDocument();
  });
});
