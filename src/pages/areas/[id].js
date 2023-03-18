import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import StyledTable from "../../components/StyledTable";
import Loader from "../../components/Loader";
import { fetchAreas, mockPlans } from "../../utils/mockData";
import styled from "styled-components";
import { calculateDaysBetweenDates, formatDate } from "../../utils/dates";
import Navigator from "../../components/ٍNavigator";

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`;

const Area = ({ id }) => {
  const [area, setArea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [areaPlans, setAreaPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAreas();
      const targetArea = data.find((area) => area.id === parseInt(id));
      setArea(targetArea);
      setIsLoading(false);
    };

    fetchData();

    return () => {};
  }, [id]);

  useEffect(() => {
    const getPlans = async () => {
      // setIsLoading(true);
      const targetPlans = mockPlans?.filter(
        (plan) => plan.area?.id === parseInt(id)
      );
      setAreaPlans(targetPlans);
      // setIsLoading(false);
    };

    getPlans();

    return () => {};
  }, [id]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <Navigator>
            <p>المناطق / </p>
          </Navigator>

          <h1>{area.name}</h1>
          <hr />

          <InfoBox className="m-block-2">
            <p>عدد العملاء:</p>
            <p>15</p>

            <p>اخر خط سير:</p>
            <p>{new Date().toDateString()}</p>
          </InfoBox>

          <hr />
          <br />
          <h3>خطط السير</h3>
          <StyledTable className="m-block-1">
            <thead>
              <tr>
                <th>المندوب</th>
                <th>من</th>
                <th>الى</th>
                <th>عدد العملاء</th>
                <th>المبيت</th>
              </tr>
            </thead>
            <tbody>
              {!areaPlans ? (
                <tr>
                  <td colSpan={5}>لا يوجد بيانات</td>
                </tr>
              ) : (
                areaPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.user.name}</td>
                    <td>{formatDate(new Date(plan.startDate))}</td>
                    <td>{formatDate(new Date(plan.endDate))}</td>
                    <td>{plan.plan_accounts.length}</td>
                    <td>
                      {calculateDaysBetweenDates(plan.startDate, plan.endDate)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </StyledTable>
        </section>
      )}
    </Layout>
  );
};

export default Area;
