import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen'; // Adjust the path as necessary
import { SafeAreaView } from 'react-native-safe-area-context';

// Mocking the required components and hooks
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn().mockReturnValue({ params: {} }),
}));

jest.mock('../components/MainHeader', () => 'MainHeader');
jest.mock('../components/ScreenHeader', () => 'ScreenHeader');
jest.mock('../components/TopPlacesCarousel', () => 'TopPlacesCarousel');
jest.mock('../components/SectionHeader', () => 'SectionHeader');
jest.mock('../components/TripsList', () => 'TripsList');
jest.mock('../components/FAB', () => 'FAB');

// Test suite
describe('HomeScreen', () => {
  beforeEach(() => {
    fetch.resetMocks(); // Reset mocks before each test
  });

  it('should render loading state initially', async () => {
    render(<HomeScreen navigation={{}} route={{}} />);
    // Check if the loading spinner is shown
    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('should render HomeScreen after loading', async () => {
    // Mock the fetch calls
    fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Place 1' }])) // Mock for top places
          .mockResponseOnce(JSON.stringify([{ id: 2, name: 'Place 2' }])) // Mock for places
    
    render(<HomeScreen navigation={{}} route={{}} />);

    await waitFor(() => screen.getByText('Travel')); // MainHeader text
    expect(screen.getByText('List Your')).toBeTruthy(); // ScreenHeader text
  });

  it('should handle refresh control', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Place 1' }]))
          .mockResponseOnce(JSON.stringify([{ id: 2, name: 'Place 2' }]));

    render(<HomeScreen navigation={{}} route={{}} />);

    const refreshControl = screen.getByTestId('refreshControl');
    fireEvent(refreshControl, 'refresh'); // Simulate a refresh event

    await waitFor(() => screen.getByText('Travel'));
    expect(screen.getByText('List Your')).toBeTruthy();
  });

  it('should show toast when tripAdded is passed in route params', async () => {
    jest.spyOn(global, 'Toast').mockImplementation(() => {}); // Mock the Toast component

    render(<HomeScreen navigation={{}} route={{ params: { tripAdded: true } }} />);

    await waitFor(() => screen.getByText('Success'));
    expect(global.Toast.show).toHaveBeenCalledWith(expect.objectContaining({
      type: 'success',
      text1: 'Success',
      text2: 'Trip added successfully',
    }));
  });
});

