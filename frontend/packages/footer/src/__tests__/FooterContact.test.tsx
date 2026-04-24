import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FooterContact as FooterContactUI } from '../index';

describe('FooterContactUI', () => {
  it('renders contact fields', () => {
    const contact = {
      name: 'Test Club',
      address: 'Street 1\n12345 City',
      phone: '+4912345678',
      email: 'info@test.example',
      openingHours: ['Mo-Fr 9-17'],
    };

    render(<FooterContactUI contact={contact} /> as any);

    expect(screen.getByText('Test Club')).toBeDefined();
    expect(screen.getByText('+4912345678')).toBeDefined();
    expect(screen.getByText('info@test.example')).toBeDefined();
  });
});
