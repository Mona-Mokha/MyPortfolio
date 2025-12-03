import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signin from '../components/Signin';
import { AuthContext } from '../context/AuthContext';
import { createMockLocalStorage } from './test-helpers';

const mockNavigate = jest.fn();

// Mock the router hook to verify redirects.
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('Signin', () => {
  let loginMock;
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: createMockLocalStorage(),
      writable: true
    });

    // provide a login mock that also writes to localStorage like the real context
    loginMock = jest.fn((token, name, role) => {
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('userName', name);
      window.localStorage.setItem('userRole', role);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('updates the inputs as the user types', () => {
    render(
      <AuthContext.Provider value={{ login: jest.fn() }}>
        <Signin />
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Step 1: simulate the user typing.
    fireEvent.change(emailInput, { target: { name: 'email', value: 'student@test.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: '123456' } });

    expect(emailInput).toHaveValue('student@test.com');
    expect(passwordInput).toHaveValue('123456');
  });

  test('sends the credentials to the API and stores the token', async () => {
    // mock the API signin response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'token-123',
        user: { name: 'student', role: 'user' }
      })
    });

    render(
      <AuthContext.Provider value={{ login: loginMock }}>
        <Signin />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { name: 'email', value: 'student@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { name: 'password', value: '123456' } });

    // Step 2: submit the form and wait for the mocked API call.
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/signin', expect.objectContaining({ method: 'POST' }));
    });

    expect(loginMock).toHaveBeenCalledWith('token-123', 'student', 'user');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('token', 'token-123');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('userName', 'student');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('userRole', 'user');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});