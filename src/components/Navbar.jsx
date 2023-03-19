import React from "react";
import styled from "styled-components";
import { BiMenu } from "react-icons/bi";
import { ImSwitch } from "react-icons/im";

const StyledNav = styled.nav`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #000;
  color: #fff;

  @media (min-width: 55rem) {
    padding-inline: 2rem;
  }

  .logo {
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (min-width: 55rem) {
      display: none;
    }
  }

  .user {
    margin-right: auto;

    .avatar {
      display: grid;
      place-items: center;
      width: 2rem;
      aspect-ratio: 1 / 1;
      border-radius: 100%;
      overflow: hidden;
      color: red;
      cursor: pointer;
    }
  }

  .username {
    display: none;

    @media (min-width: 55rem) {
      display: block;
    }
  }

  .rounded-btn {
    display: grid;
    place-items: center;
    width: 2rem;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;
    background-color: hsl(0, 1.75%, 5.17%, 0.7);

    &:hover {
      background-color: hsl(0, 1.75%, 11.17%);
    }
  }
`;

const Navbar = ({ user, logout }) => {
  return (
    <StyledNav>
      <div className="logo">
        <div className="rounded-btn">
          <BiMenu size="1.25rem" />
        </div>
        <p>كرمه</p>
      </div>

      <div className="username">
        <p>{user.fullname}</p>
      </div>

      <div className="user">
        <div className="rounded-btn" onClick={logout}>
          <ImSwitch size="1rem" color="red" />
        </div>
      </div>
    </StyledNav>
  );
};

export default Navbar;
