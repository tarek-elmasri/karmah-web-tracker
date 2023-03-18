import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: hsl(0 0% 0% / 0.7);
  display: grid;
  place-items: center;

  .container {
    width: min(35rem, 80vw);
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <StyledModal>
      <div className="container">{children}</div>
    </StyledModal>
  );
};

export default Modal;
