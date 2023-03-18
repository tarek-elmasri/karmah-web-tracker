import { navigate } from "gatsby";
import React from "react";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import StyledTable from "../../../components/StyledTable";
import { mockPlans } from "../../../utils/mockData";

const Plans = () => {
  const data = mockPlans;

  return (
    <Layout>
      <div>
        <h1>خطط السير</h1>
        <hr />

        <Button type="button" onClick={() => navigate("/plans/new")}>
          جديد
        </Button>

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
            {data.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.area.name}</td>
                <td>{plan.startDate}</td>
                <td>{plan.endDate}</td>
                <td>{plan.user.name}</td>
                <td>{plan.plan_accounts.length}</td>
                <td>{plan.days}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </Layout>
  );
};

export default Plans;
