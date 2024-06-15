import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  it('renders children when isOpen is true', () => {
    render(
      <Modal isOpen={true} setIsOpen={() => {}} rect={{}} modalRef={{}}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();
  });

  it('does not render children when isOpen is false', () => {
    render(
      <Modal isOpen={false} setIsOpen={() => {}} rect={{}} modalRef={{}}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.queryByText('Modal Content');
    expect(modalContent).not.toBeInTheDocument();
  });

  it('calls setIsOpen with false when clicking outside the modal', () => {
    const setIsOpenMock = jest.fn();
    render(
      <div>
        <div id="portal"></div>
        <Modal isOpen={true} setIsOpen={setIsOpenMock} rect={{}} modalRef={{}}>
          <div>Modal Content</div>
        </Modal>
      </div>
    );

    const portal = document.getElementById('portal');
    userEvent.click(portal);
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});
