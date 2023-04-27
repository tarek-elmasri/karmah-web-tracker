import React, { useState } from "react";
import { navigate } from "gatsby";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const NewUser = () => {
  const { isAdmin } = useAuth();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    role: "user",
  });

  const { createUser, isLoading, error } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createUser(user);
      navigate("/users/main");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAdmin) navigate("/");

  const errors = error?.response?.data?.errors;
  const isValid =
    !!user.fullname.length && !!user.username.length && !!user.password.length;
  return (
    <Layout>
      {isLoading && <Loader />}
      <div>
        <h1>اضافة موظف</h1>
        <hr />
      </div>

      <div className="m-block-2 m-inline-1">
        <div className="form-group">
          <label htmlFor="fullname">اسم الموظف :</label>
          <input
            id="fullname"
            name="fullname"
            value={user.fullname}
            onChange={handleChange}
          />
          <small className="text-red">
            {errors?.fullname && errors.fullname[0]}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="username">اسم المستخدم :</label>
          <input
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <small className="text-red">
            {errors?.username && errors.username[0]}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="password">كلمة المرور :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <small className="text-red">
            {errors?.password && errors.password[0]}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="role">الصلاحية :</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="admin">أدمن</option>
            <option value="user">موظف</option>
          </select>
        </div>

        <div className="m-block-2 flex">
          <Button
            className="success"
            onClick={handleSubmit}
            disabled={isLoading || !isValid}
          >
            اضافة
          </Button>
          <Button onClick={() => navigate("/users/main")}>عودة</Button>
        </div>
      </div>
    </Layout>
  );
};

export default NewUser;
