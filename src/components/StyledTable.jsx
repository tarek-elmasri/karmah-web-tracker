import styled from "styled-components";

const StyledTable = styled.table`
  overflow-x: auto;
  width: 80vw;
  margin-inline: auto;
  border-collapse: collapse;
  text-align: center;

  @media (min-width: 55rem) {
    width: 37rem;
  }

  tr {
    width: 100%;
  }

  th,
  td {
    padding: 0.5rem 1rem;
  }

  th {
    background-color: #000;
    border: 1px solid #fff;
    color: #fff;
  }

  td {
    border: 1px solid #eee;
  }

  tr:nth-of-type(even) {
    background-color: #fafafa;
  }
`;

export default StyledTable;
