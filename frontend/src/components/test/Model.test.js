import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

describe('Modal Component', () => {
    const rect = {
        left: 100,
        right: 200,
        top: 50,
        bottom: 150,
        width: 100,
        height: 100
    };

    const modalRef = { current: null };

    beforeAll(() => {
        // Create a portal div for the modal
        const portalDiv = document.createElement('div');
        portalDiv.setAttribute('id', 'portal');
        document.body.appendChild(portalDiv);
    });

    afterAll(() => {
        // Clean up the portal div
        document.body.removeChild(document.getElementById('portal'));
    });

    afterEach(cleanup);

    it('renders the modal when isOpen is true', () => {
        render(
            <Modal setIsOpen={() => {}} isOpen={true} rect={rect} modalRef={modalRef}>
                <div>Modal Content</div>
            </Modal>
        );

        expect(screen.getByText('Modal Content')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toHaveClass('visible');
    });

    it('does not render the modal when isOpen is false', () => {
        render(
            <Modal setIsOpen={() => {}} isOpen={false} rect={rect} modalRef={modalRef}>
                <div>Modal Content</div>
            </Modal>
        );

        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('applies correct positioning based on rect', () => {
        const { container } = render(
            <Modal setIsOpen={() => {}} isOpen={true} rect={rect} modalRef={modalRef}>
                <div>Modal Content</div>
            </Modal>
        );

        const modalElement = container.querySelector('#modal');
        expect(modalElement).not.toBeNull(); // Ensure the modal element is found
        if (modalElement) {
            expect(modalElement).toHaveStyle(`left: calc(100px + 100px - 5dvh)`);
            expect(modalElement).toHaveStyle(`top: calc(50px + ${window.scrollY}px - 10%)`);
        }
    });
});
