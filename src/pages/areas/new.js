import React from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { navigate } from "gatsby";
import { useState } from "react";
import useApi from "../../hooks/useApi";
import Loader from "../../components/Loader";


const New = () => {

  const [form, setForm] = useState({ name: "" })
  const { createArea, isLoading, isError } = useApi()

  const handleSubmit = async () => {
    try {
      await createArea(form)
      navigate('/areas/main')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout>
      {isLoading && <Loader />}
      <section>
        <h1>اضافة منطقة</h1>
        <hr />

        <br />
        {isError &&
          <div>
            <p className="text-red fw-bold">حدث خطا اثناء العملية. الرجاء المحاولة مرة اخرى</p>
          </div>
        }
        <div className="form-group">
          <label htmlFor="name">اسم المنطقة</label>
          <input id="name" name="name" value={form.name} required onChange={(e) => setForm({ name: e.target.value })} />
        </div>

        <div className="flex m-block-1">
          <Button disabled={form.name === ""} onClick={() => handleSubmit()} className="success">حفظ</Button>
          <Button onClick={() => navigate("/areas/main")}>عودة</Button>
        </div>
      </section>
    </Layout>
  );
};

export default New;
