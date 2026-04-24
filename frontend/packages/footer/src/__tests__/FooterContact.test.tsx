import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../index';

describe('Footer', () => {
  it('renders contact information from settings', () => {
    const settings = {
      site_name: 'Test Club',
      club_name: 'Test Club',
      street: 'Street 1',
      postal_code: '12345',
      city: 'City',
      phone: '+4912345678',
    };

    render(
      <MemoryRouter>
        <Footer settings={settings} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Club')).toBeDefined();
    expect(screen.getByText('+4912345678')).toBeDefined();
  });
});
