import React from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  position: fixed;
  z-index: 1000;
  inset: 0;
  background-color: hsl(0 0% 0% / 0.8);
  color: #fff;
  display: grid;
  place-items: center;
`;

const Loader = ({ msg }) => {
  return (
    <StyledLoader>
      <p>{msg || "الرجاء الانتظار ..."}</p>
    </StyledLoader>
  );
};

export default Loader;
