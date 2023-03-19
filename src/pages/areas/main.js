import React, { useEffect } from "react";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import StyledTable from "../../components/StyledTable";
import Loader from "../../components/Loader";
import { navigate } from "gatsby";
import useApi from "../../hooks/useApi";

const Areas = () => {
  const { getAreas, isLoading, isError, data: areas } = useApi([])
  useEffect(() => {
    getAreas()
    return () => { };
  }, []);

  return (
    <Layout>
      {isLoading && <Loader />}
      <div>
        <h1>المناطق</h1>
        <hr />

        <Button onClick={() => navigate("/areas/new")}>اضافة</Button>

        <StyledTable className="m-block-2">
          <thead>
            <tr>
              <th>اسم المنطقة</th>
              <th>عدد العملاء</th>
              <th>#</th>
            </tr>
          </thead>

          <tbody>
            {areas.length ? (
              areas.map((area) => (
                <tr key={area.id}>
                  <td>{area.name}</td>
                  <td>{area.accounts?.length || 0}</td>
                  <td>
                    <Button
                      className="btn-sm"
                      onClick={() => navigate(`/areas/${area.id}`)}
                    >
                      عرض
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>لا يوجد مناطق</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </div>
    </Layout>
  );
};

export default Areas;
