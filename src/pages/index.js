import { navigate } from "gatsby";
import React, { useEffect } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import StyledTable from "../components/StyledTable";
import useApi from "../hooks/useApi";
import { calculateDaysBetweenDates } from "../utils/dates";
// import { mockPlans } from "../utils/mockData";

const Index = () => {
  // const data = mockPlans;

  const { getPlans, isLoading, isError, data: plans } = useApi([]);

  useEffect(() => {
    getPlans();
    return () => {};
  }, []);

  return (
    <Layout>
      {isLoading && <Loader />}
      <div>
        <h1>خطط السير</h1>
        <hr />

        <Button type="button" onClick={() => navigate("/plans/new")}>
          جديد
        </Button>

        {isError && (
          <p className="text-red fw-bold">
            حدث خطأ أثناء الاتصال بالسيرفر. الرجاء المحاولة مرة اخرى
          </p>
        )}
        <StyledTable className="m-block-2">
          <thead>
            <tr>
              <th>المنطقة</th>
              <th>من</th>
              <th>الى</th>
              <th>المندوب</th>
              <th>العملاء</th>
              <th>المبيت</th>
            </tr>
          </thead>
          <tbody>
            {plans.length ? (
              plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.area.name}</td>
                  <td>{plan.start_date}</td>
                  <td>{plan.end_date}</td>
                  <td>{plan.user.fullname}</td>
                  <td>{plan.plan_accounts.length}</td>
                  <td>
                    {calculateDaysBetweenDates(plan.start_date, plan.end_date)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>لا يوجد بيانات</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </div>
    </Layout>
  );
};

export default Index;
