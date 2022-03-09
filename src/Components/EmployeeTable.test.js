import React from 'react';
import {render, screen} from '@testing-library/react';
import EmployeeTable from "./EmployeeTable";
import data from "../data.json";


jest.mock('react-router-dom', () => {
  const mockedNavigate = jest.fn();
  return {
    __esModule: true,
    useNavigate: mockedNavigate,
  };
});


describe("Test for Employee Address Book", () => {
  let originalFetch;
  beforeAll(() => {
    delete window.matchMedia;
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(data),
    }));
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test('Test the Table data.', async () => {
    let element = null;
    render(<EmployeeTable employeesData={data.data}/>);
    element = screen.getByText(/Tiger Nixon/i);
    expect(element).toBeInTheDocument();
  });
});
