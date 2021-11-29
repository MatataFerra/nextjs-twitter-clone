import React from 'react'


import { fireEvent, render, screen } from '@testing-library/react';
import { FooterHome } from '../Footer';


test('Footer renders correctly', () => {
  const footer = render(<FooterHome />);
  expect(footer).toMatchSnapshot();
});

