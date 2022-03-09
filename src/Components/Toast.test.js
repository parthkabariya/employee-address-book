import {render, screen} from '@testing-library/react';
import Toast from './Toast';

describe("Test for Employee Address Book", () => {
  test('Test Toaster', () => {
    let Element = null;
    const {rerender, container} = render(<Toast message={'Testing Toaster'}/>);
    Element = screen.getByText(/Testing Toaster/i);
    expect(Element).toBeInTheDocument();

    rerender(<Toast message={false}/>);

    jest.useFakeTimers();
    setTimeout(() => {
      expect(container.firstChild).toHaveClass('fade-out');
      expect(container.firstChild.innerHTML).toEqual(expect.not.stringContaining('Testing Toaster'));
    }, 250);
    jest.runAllTimers();
  });
});
