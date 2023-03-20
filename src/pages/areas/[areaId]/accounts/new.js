import React from 'react'
import { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import Button from '../../../../components/Button'
import Layout from '../../../../components/Layout'
import Loader from '../../../../components/Loader'
import useApi from '../../../../hooks/useApi'

const NewAccount = ({ areaId }) => {
  const { getAreas, isLoading: isAreaLoading, isError: isAreaError, data: area } = useApi()
  const { createAccount, isLoading: isAccountLoading, error: AccountErrors } = useApi()
  const [account, setAccount] = useState({
    area_id: areaId,
    name: ""
  })

  useEffect(() => {
    getAreas(areaId)
    //eslint-disable-next-line
  }, [areaId])

  const handleCreateAccount = async () => {
    try {
      await createAccount(account)
      navigate(`/areas/${areaId}`)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Layout>
      {(isAreaLoading || isAccountLoading) && <Loader />}
      <h1>عميل جديد</h1>
      <hr />
      {(isAreaError || AccountErrors) &&
        <p className='text-red fw-bold'>حدث خطأ اثناء العملية. الرجاء المحاولة مرة اخرى</p>
      }
      <div className='flex m-block-1 fw-bold'>
        <label htmlFor='area'>المنطقة :</label>
        <p>{area?.name}</p>
      </div>

      <div className='form-group'>
        <label className='fw-bold' htmlFor='name'>اسم العميل:</label>
        <input value={account.name} onChange={e => setAccount({ name: e.target.value, area_id: areaId })} />
      </div>

      <div className="m-block-1">
        <Button
          disabled={!account.name.length || isAreaError}
          className='success'
          onClick={handleCreateAccount}
        >
          حفظ
        </Button>
        <Button className='m-inline-1' onClick={() => navigate(`/areas/${areaId}`)}>عودة</Button>
      </div>
    </Layout>
  )
}

export default NewAccount