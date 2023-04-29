import React from 'react'
import { navigate } from 'gatsby'
import useAuth from '../../../../hooks/useAuth'
import useApi from '../../../../hooks/useApi'
import { useEffect } from 'react'
import Loader from '../../../../components/Loader'
import Layout from '../../../../components/Layout'
import { useState } from 'react'
import { useMemo } from 'react'
import Button from '../../../../components/Button'

const UpdateAccounts = ({ userId }) => {
  const { isAdmin } = useAuth()
  const { getAreas, isLoading: isAreasLoading, isError: isAreasError, data: areas } = useApi([])
  const { getUser, isLoading: userIsLoading, isError: userIsError, data: user } = useApi()

  const [formAccounts, setFormAccounts] = useState([])
  const [currentAreaId, setCurrentAreaId] = useState("all")
  const [selection, setSelection] = useState({ leftSideSelection: "", rightSideSelection: "" })

  useEffect(() => {
    getAreas()
    getUser(userId)
    return () => {
    }
    // eslint-disable-next-line
  }, [])

  const filteredAreaAccounts = useMemo(() => {
    //bugged
    const filterAccounts = (accounts) => {
      const results = []
      accounts.forEach(account => {
        if (!formAccounts.find(formAccount => formAccount.id === account.id)) results.push(account)
      })

      console.log("results", results)
      return results
    }
    console.log("recalculated")


    if (currentAreaId === "all") {
      return areas.map(area => filterAccounts(area.accounts)).flat()
    }

    const targetArea = areas.find(area => area.id.toString() === currentAreaId)
    return filterAccounts(targetArea.accounts)
  }
    , [currentAreaId, areas, formAccounts])
  useEffect(() => {
    if (user?.accounts)
      setFormAccounts(user.accounts)
  }, [user, setFormAccounts])

  useEffect(() => {
    setSelection(prev => ({ ...prev, rightSideSelection: filteredAreaAccounts[0]?.id.toString() }))
  }, [currentAreaId, setSelection, filteredAreaAccounts])






  const handleSelection = (e) => {
    const { name, value } = e.target
    setSelection(prev => ({ ...prev, [name]: value }))
  }

  const handleAddition = () => {
    const result = filteredAreaAccounts.find(acc => acc.id.toString() === selection.rightSideSelection)
    console.log(result)
    if (result) {
      setFormAccounts(prev => ([...prev, result]))
      setSelection({ rightSideSelection: filteredAreaAccounts[0]?.id.toString(), leftSideSelection: result.id.toString() })
    }
  }

  console.log("form accounts: ", formAccounts)
  console.log("filtered area accounts", filteredAreaAccounts)
  if (!isAdmin) return navigate('/')

  return (
    <Layout>
      {(isAreasLoading || userIsLoading) && <Loader />}
      <div>
        <h1>تحديث عملاء موظف</h1>
        <hr />
      </div>
      <div className='m-block-1 grid gap-1'>
        <h3>الموظف : {user?.fullname}</h3>
        <div className='form-group'>
          <label htmlFor='filteredArea'>المنطقة :</label>
          <select id="filteredArea" name="filteredArea" value={currentAreaId} onChange={(e) => setCurrentAreaId(e.target.value)}>
            <option value="all">الكل</option>
            {areas.map(area => (
              <option key={area.name} value={area.id}>{area.name}</option>
            ))}
          </select>

          <select size={10} value={selection.rightSideSelection} name="rightSideSelection" onChange={handleSelection}>
            {filteredAreaAccounts.map(account => (
              <option key={`arAcc-${account.id}`} value={account.id}>{account.name}</option>
            ))}
          </select>

          <Button onClick={handleAddition}>add</Button>

          <select size={10} value={selection.leftSideSelection} name="leftSideSelection" onChange={handleSelection}>
            {formAccounts.map(account => (
              <option key={`usAcc-${account.id}`} value={account.id}>{account.name}</option>
            ))}
          </select>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateAccounts