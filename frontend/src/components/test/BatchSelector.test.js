import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BatchSelector from './BatchSelector';

describe('BatchSelector Component', () => {
  let selectedBatches;
  let setSelectedBatches;

  beforeEach(() => {
    selectedBatches = [];
    setSelectedBatches = jest.fn((newBatches) => {
      selectedBatches = newBatches;
    });
  });

  it('renders batch checkboxes', () => {
    render(<BatchSelector selectedBatches={selectedBatches} setSelectedBatches={setSelectedBatches} />);
    const batchCheckboxes = screen.getAllByRole('checkbox');

    expect(batchCheckboxes).toHaveLength(7);
    const batchValues = ['E19', 'E20', 'E21', 'E22', 'E23', 'E24', 'other'];
    batchCheckboxes.forEach((checkbox, index) => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('value', batchValues[index]);
    });
  });

  it('checks if a batch is pre-selected', () => {
    selectedBatches = ['E19'];
    render(<BatchSelector selectedBatches={selectedBatches} setSelectedBatches={setSelectedBatches} />);
    const checkbox = screen.getByLabelText('E19');

    expect(checkbox).toBeChecked();
  });
});
