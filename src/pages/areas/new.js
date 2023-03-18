import React from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import Button from "../../components/Button";
import { navigate } from "gatsby";

const NewArea = styled.section``;

const New = () => {
  return (
    <Layout>
      <NewArea>
        <h1>اضافة منطقة</h1>
        <hr />

        <br />
        <div className="form-group">
          <label htmlFor="name">اسم المنطقة</label>
          <input id="name" name="name" />
        </div>

        <div className="flex m-block-1">
          <Button className="success">حفظ</Button>
          <Button onClick={() => navigate("/areas/main")}>عودة</Button>
        </div>
      </NewArea>
    </Layout>
  );
};

export default New;
