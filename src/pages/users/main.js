import React, { useEffect } from "react";
import { navigate } from "gatsby";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import StyledTable from "../../components/StyledTable";

const Users = () => {
  const { getUsers, isLoading, data: users } = useApi([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    getUsers();
    return () => { };
    // eslint-disable-next-line
  }, []);

  if (!isAdmin) navigate("/");
  return (
    <Layout>
      {isLoading && <Loader />}
      <div>
        <h1>الموظفين</h1>
        <hr />

        <Button onClick={() => navigate("/users/new")}>اضافة</Button>
      </div>

      <StyledTable className="m-block-2">
        <thead>
          <tr>
            <th>الموظف</th>
            <th>الصلاحية</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullname}</td>
                <td>{user.role === "admin" ? "أدمن" : "موظف"}</td>
                <td>
                  <Button
                    className="btn-sm"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    عرض
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>لا يوجد موظفين</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </Layout>
  );
};

export default Users;
