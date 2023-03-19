import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import StyledTable from "../../components/StyledTable";
import { calculateDaysBetweenDates, formatDate } from "../../utils/dates";
import { GrFormClose } from "react-icons/gr";
import { navigate } from "gatsby";
import useApi from "../../hooks/useApi";

const StyledNewPlan = styled.section`
  textarea {
    resize: none;
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .close-btn path {
    stroke: red;
  }
`;

const NewPlan = () => {
  const todayDate = new Date();
  const [plan, setPlan] = useState({
    area_id: "",
    start_date: formatDate(todayDate),
    end_date: formatDate(todayDate),
    plan_accounts_attributes: [],
  });

  const { isLoading: isAreasLoading, isError: isAreasErrors, getAreas, data: areas } = useApi([])
  const { isLoading: isPlanLoading, isError: isPlanError, createPlan } = useApi()

  const [accounts, setAccounts] = useState([]);
  const [accountForm, setAccountForm] = useState({
    id: "",
    objective: "",
  });

  // find area by id
  const selectAreaById = useCallback(
    (areaId) => areas.find((area) => area.id === parseInt(areaId)),
    [areas]
  );

  useEffect(() => {

    setAccounts(areas[0]?.accounts || []); // separate accounts into individual state to facilitate filtering
    setAccountForm((prev) => ({ ...prev, id: areas[0]?.accounts[0]?.id })); // setting add Account form state
    setPlan((prev) => ({ ...prev, area_id: areas[0]?.id })); // setting new plan states

  }, [areas])


  useEffect(() => {
    getAreas()

  }, []);

  useEffect(() => {
    const newArea = selectAreaById(plan.area_id);
    setAccounts(newArea?.accounts);
    setPlan((prev) => ({ ...prev, plan_accounts_attributes: [] }));
    setAccountForm({ id: newArea?.accounts[0]?.id, objective: "" });
  }, [plan.area_id, selectAreaById]);

  // find account by id -- using current area id selection
  const selectAccountById = useCallback(
    (accountId) =>
      selectAreaById(plan.area_id)?.accounts.find(
        (account) => account.id === parseInt(accountId)
      ),
    [plan.area_id, selectAreaById]
  );

  useEffect(() => {
    if (calculateDaysBetweenDates(plan.start_date, plan.end_date) < 0)
      setPlan((prev) => ({ ...prev, end_date: plan.start_date }));
  }, [plan.start_date, plan.end_date]);

  const handleAddAccount = () => {
    const newAccount = selectAccountById(accountForm.id);
    const newAccountsList = accounts.filter((acc) => acc.id !== newAccount.id);

    setAccounts(newAccountsList);

    setPlan((prev) => ({
      ...prev,
      plan_accounts_attributes: [
        ...plan.plan_accounts_attributes,
        {
          id: newAccount.id,
          name: newAccount.name,
          objective: accountForm.objective,
        },
      ],
    }));

    // resetForm
    setAccountForm({ id: newAccountsList[0]?.id, objective: "" });
  };

  const handleRemoveAccount = (account) => {
    setPlan((prev) => ({
      ...prev,
      plan_accounts_attributes: plan.plan_accounts_attributes.filter((acc) => acc.id !== account.id),
    }));

    setAccounts((prev) => [...prev, { id: account.id, name: account.name }]);

    setAccountForm({
      id: accounts.length ? accounts[0]?.id : account.id,
      objective: "",
    });
  };

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setPlan((prev) => ({ ...prev, [name]: value }));
  };

  const accountFormIsValid = accounts?.length && accountForm.objective.length;

  return (
    <Layout>
      {isAreasLoading ? (
        <Loader />
      ) : (
        <StyledNewPlan>
          <h1>اضافة خطة سير</h1>
          <hr />
          <div className="form-group">
            <label htmlFor="area_id">المنطقة</label>
            <select
              id="area_id"
              name="area_id"
              value={plan.area_id}
              onChange={handlePlanChange}
            >
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="start_date">من</label>
            <input
              id="start_date"
              name="start_date"
              value={plan.start_date}
              min={formatDate(todayDate)}
              onChange={handlePlanChange}
              type="date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">الى</label>
            <input
              id="end_date"
              name="end_date"
              value={plan.end_date}
              min={plan.start_date}
              onChange={handlePlanChange}
              type="date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="days">ايام المبيت</label>
            <input
              id="days"
              name="days"
              value={calculateDaysBetweenDates(plan.start_date, plan.end_date)}
              // onChange={handlePlanChange}
              type="number"
              disabled
            />
          </div>

          <br />
          <br />
          <h3>العملاء المستهدفين</h3>
          <hr />

          <div className="form-group">
            <label htmlFor="account">العميل :</label>
            <select
              name="account"
              value={accountForm.id}
              onChange={(e) =>
                setAccountForm((prev) => ({
                  ...prev,
                  id: parseInt(e.target.value),
                }))
              }
            >
              {accounts?.map((account, i) => (
                <option key={`acc${i}`} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="objective">الغرض من الزيارة</label>
            <textarea
              maxLength="100"
              id="objective"
              value={accountForm.objective}
              onChange={(e) =>
                setAccountForm((prev) => ({
                  ...prev,
                  objective: e.target.value,
                }))
              }
            />
          </div>
          <Button
            type="button"
            onClick={handleAddAccount}
            disabled={!accountFormIsValid}
          >
            اضافة
          </Button>
          <StyledTable className="m-block-2">
            <thead>
              <tr>
                <th>العميل</th>
                <th>الغرض من الزيارة</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {plan.plan_accounts_attributes.length ? (
                plan.plan_accounts_attributes.map((acc) => (
                  <tr key={acc.id}>
                    <td>{acc.name}</td>
                    <td>{acc.objective}</td>
                    <td>
                      <GrFormClose
                        className="close-btn cursor-pointer"
                        onClick={() => handleRemoveAccount(acc)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>الرجاء اضافة العملاء</td>
                </tr>
              )}
            </tbody>
          </StyledTable>

          <div className="flex">
            <Button className="success" onClick={() => console.log(plan)}>
              حفظ
            </Button>
            <Button onClick={() => navigate("/")}>عودة</Button>
          </div>
        </StyledNewPlan>
      )}
    </Layout>
  );
};

export default NewPlan;
