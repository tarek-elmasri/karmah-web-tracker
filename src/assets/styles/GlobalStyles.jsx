import { createGlobalStyle } from "styled-components";
import variables from "./variables";

const GlobalStyles = createGlobalStyle`

  ${variables}

  /* ======= CSS RESETS ========== */
  // https://piccalil.li/blog/a-modern-css-reset

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body, #root {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  hr{
    opacity: 0.4;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
    font-size: 0.975rem;
    resize: none;
    padding: 0.25rem .5rem;
    border: 1px solid var(--clr-primary-100);
    border-radius: 0.4rem;

    &:focus-visible{
      outline: none;
      box-shadow: 0 0 2px var(--clr-primary-500);
    }
  }




  /* ================ UTILITIES ==================== */
  .form-group {
    display: grid;
    grid-template-columns: min(17rem, 100%);
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .p-2{
    padding: 2rem;
  }

  .m-inline-1{
    margin-inline: 1rem;
  }

  .m-inline-2{
    margin-inline: 2rem;
  }

  .m-block-1{
    margin-block: 1rem;
  }

  .m-block-2{
    margin-block: 2rem;
  }

  .flex{
    display: flex;
    gap: 1rem;
  }

  .grid{
    display: grid;
    gap: 1rem;
  }

  .cursor-pointer{
    cursor: pointer;
  }

  .text-red{
    color: #ff0000;
  }

  .fw-bold{
    font-weight: bold
  }

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
    scroll-behavior: auto;
    }
    
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;
