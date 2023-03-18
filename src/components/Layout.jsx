import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import "react-datepicker/dist/react-datepicker.css";
import mixins from "../assets/styles/mixins";

const StyledLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 55rem) {
    grid-template-columns: 17rem auto;
  }

  .sidebar {
    display: none;
    background-color: var(--clr-primary-400);
    @media (min-width: 55rem) {
      display: block;
    }
  }
`;
const Layout = ({ children }) => {
  return (
    <div id="root" dir="rtl">
      <ThemeProvider theme={mixins}>
        <GlobalStyles />

        <StyledLayout>
          <aside className="sidebar">
            <Sidebar />
          </aside>

          <div>
            <header>
              <Navbar />
            </header>
            <main className="p-2">{children}</main>
          </div>
        </StyledLayout>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
