import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import useAuth from "../hooks/useAuth";

const StyledSidebar = styled.div`
  background-color: var(--clr-primary-400);
  color: white;

  .logo {
    width: 12rem;
    padding: 2rem;
    margin-inline: auto;
    text-align: center;
  }

  .tab {
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: inherit;
    &.active {
      background-color: var(--clr-primary-500);
      &:hover {
        background-color: var(--clr-primary-500);
      }
    }

    &:hover {
      background-color: var(--clr-primary-300);
    }
  }
`;

const Sidebar = () => {
  const { isAdmin } = useAuth();
  return (
    <StyledSidebar>
      <div className="logo">logo</div>
      <Link className="tab" to="/areas/main" activeClassName="active">
        المناطق
      </Link>
      <Link className="tab" to="/" activeClassName="active">
        خطط السير
      </Link>
      <Link className="tab" to="/sales" activeClassName="active">
        <p>خطط المبيعات</p>
      </Link>
      <Link className="tab" to="/accounts" activeClassName="active">
        <p>العملاء</p>
      </Link>
      {isAdmin && (
        <Link className="tab" to="/users/main" activeClassName="active">
          <p>الموظفين</p>
        </Link>
      )}
    </StyledSidebar>
  );
};

export default Sidebar;
