import styled from "styled-components";

const Button = styled.button`
  padding: 0.25em 1em;
  border: none;
  background-color: var(--clr-primary-400);
  font-weight: bold;
  color: #fff;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: var(--clr-primary-500);
    outline: none;
  }

  &:disabled {
    background-color: var(--clr-primary-100);
    cursor: unset;
  }

  &.btn-sm {
    font-size: 0.75rem;
    color: #fff;
    font-weight: bold;
  }

  &.success {
    background-color: hsl(120, 100%, 30.1%);

    &:hover,
    &:focus-visible {
      background-color: hsl(120, 100%, 25.1%);
      outline: none;
    }

    &:disabled {
      background-color: hsl(120, 100%, 25.1%, 0.6);
      cursor: unset;
    }
  }

  &.danger {
  }
`;

// export const GreenButton = styled(Button)`
//   background-color: hsl(120, 100%, 30.1%);

//   &:hover,
//   &:focus-visible {
//     background-color: hsl(120, 100%, 25.1%);
//     outline: none;
//   }

//   &:disabled {
//     background-color: hsl(120, 100%, 25.1%, 0.6);
//     cursor: unset;
//   }
// `;
export default Button;
