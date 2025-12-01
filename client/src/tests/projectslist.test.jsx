import { render, screen } from '@testing-library/react';
import ProjectsList from '../components/ProjectsList';
import { AuthContext } from '../context/AuthContext';
import { createMockLocalStorage } from './test-helpers';

const mockNavigate = jest.fn();

// The component uses the router hook to redirect, so we control it here.
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('ProjectsList', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: createMockLocalStorage(),
      writable: true
    });

    window.localStorage.getItem.mockReturnValue('token-1');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows a friendly message when no projects exist', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    // Step 1: render the component.
    render(
      <AuthContext.Provider value={{ user: { name: 'student', role: 'user' } }}>
        <ProjectsList />
      </AuthContext.Provider>
    );

    expect(global.fetch).toHaveBeenCalledWith('/api/projects', expect.objectContaining({
      headers: expect.objectContaining({ Authorization: expect.any(String) })
    }));

    expect(await screen.findByText(/no projects available/i)).toBeInTheDocument();
  });

  test('renders each project returned by the API', async () => {
    const mockProjects = [
      {
        _id: '1',
        title: 'Portfolio',
        description: 'My personal portfolio',
        completion: '2024-12-31T00:00:00.000Z'
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects
    });

    // Step 1: render the component with fake API data ready.
    render(
      <AuthContext.Provider value={{ user: { name: 'student', role: 'user' } }}>
        <ProjectsList />
      </AuthContext.Provider>
    );

    expect(await screen.findByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText(mockProjects[0].description)).toBeInTheDocument();
  });
});