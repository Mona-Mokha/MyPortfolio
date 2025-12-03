import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../components/Signup';
import { AuthContext } from '../context/AuthContext';
import { createMockLocalStorage } from './test-helpers';

const mockNavigate = jest.fn();

// This lets us assert that successful register redirects home.
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('Signup', () => {
  let loginMock;
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: createMockLocalStorage(),
      writable: true
    });

    // provide a login mock that mirrors AuthContext.login behavior
    loginMock = jest.fn((token, name, role) => {
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('userName', name);
      window.localStorage.setItem('userRole', role);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('lets the user fill out each field', () => {
    render(
      <AuthContext.Provider value={{ login: jest.fn() }}>
        <Signup />
      </AuthContext.Provider>
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Step 1: show the component reacts to typing.
    fireEvent.change(nameInput, { target: { name: 'name', value: 'student' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'student@test.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: '123456' } });

    expect(nameInput).toHaveValue('student');
    expect(emailInput).toHaveValue('student@test.com');
    expect(passwordInput).toHaveValue('123456');
  });

  test('submits the form and saves the returned user', async () => {
    const setUser = jest.fn();
    // First call: create user (returns ok true, body not important)
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ message: 'created' }) });
    // Second call: signin returns token and user
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'new-token',
        user: { name: 'student', role: 'user' }
      })
    });

    render(
      <AuthContext.Provider value={{ login: loginMock }}>
        <Signup setUser={setUser} />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { name: 'name', value: 'student' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { name: 'email', value: 'student@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { name: 'password', value: '123456' } });

    // Step 2: submit and expect the two-step happy-path flow.
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/users', expect.objectContaining({ method: 'POST' }));
    });

    // second fetch (signin)
    expect(global.fetch).toHaveBeenCalledWith('/api/auth/signin', expect.objectContaining({ method: 'POST' }));

    expect(window.localStorage.setItem).toHaveBeenCalledWith('token', 'new-token');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('userName', 'student');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('userRole', 'user');
    expect(setUser).toHaveBeenCalledWith({ name: 'student', role: 'user' });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});