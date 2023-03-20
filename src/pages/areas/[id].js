import React, { useEffect } from "react";
import { navigate } from 'gatsby'
import Layout from "../../components/Layout";
import StyledTable from "../../components/StyledTable";
import Loader from "../../components/Loader";
import Button from '../../components/Button'
import styled from "styled-components";
import { calculateDaysBetweenDates, formatDate } from "../../utils/dates";
import Navigator from "../../components/ٍNavigator";
import useApi from "../../hooks/useApi";

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`;

const Area = ({ id }) => {

  const { getAreas, isLoading, isError, data: area } = useApi()

  useEffect(() => {
    getAreas(id)
    //eslint-disable-next-line
  }, [id]);

  const lastPlanDate = area?.plans[0]?.start_date ? new Date(area?.plans[0]?.start_date).toDateString() : 'لا يوجد خطط'

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <Navigator>
            <p>المناطق / </p>
          </Navigator>

          <h1>{area?.name}</h1>
          {isError && (
            <p className="text-red fw-bold">حدث خطأ اثناء الاتصال بالسيرفر. الرجاء المحاولة لاحقا</p>
          )}
          <hr />

          <InfoBox className="m-block-2">
            <p>عدد العملاء:</p>
            <p>{area?.accounts.length}</p>

            <p>اخر خط سير:</p>
            <p>{lastPlanDate}</p>
          </InfoBox>

          <hr />
          <br />
          <h3>خطط السير</h3>
          {/* <br /> */}
          <Button onClick={() => navigate('/plans/new')}>اضافة</Button>
          <br />
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
              {!area?.plans.length ? (
                <tr>
                  <td colSpan={5}>لا يوجد بيانات</td>
                </tr>
              ) : (
                area?.plans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.user.fullname}</td>
                    <td>{formatDate(new Date(plan.start_date))}</td>
                    <td>{formatDate(new Date(plan.end_date))}</td>
                    <td>{plan.plan_accounts.length}</td>
                    <td>
                      {calculateDaysBetweenDates(plan.start_date, plan.end_date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </StyledTable>
          <br />
          <hr />
          <br />
          <h3>العملاء</h3>
          <Button onClick={() => navigate(`/areas/${area?.id}/accounts/new`)}>اضافة</Button>
          <br />
          <StyledTable className="m-block-1">
            <thead>
              <tr>
                <th>#</th>
                <th>العميل</th>
              </tr>
            </thead>
            <tbody>
              {
                !area?.accounts.length ? (
                  <tr><td colSpan={2}>لا يوجد بيانات</td></tr>
                ) :
                  area?.accounts.map((account, i) => (
                    <tr key={account.id}>
                      <td>{i + 1}</td>
                      <td>{account.name}</td>
                    </tr>
                  ))
              }

            </tbody>
          </StyledTable>
        </section>
      )}
    </Layout>
  );
};

export default Area;
