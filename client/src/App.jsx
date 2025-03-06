import { useState, useEffect } from 'react'

import { test, houseTest } from '../utils/backendCalls'

function App() {
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await houseTest();
        console.log('data :>> ', data);
        setTestData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])


  return (
    <>
      <p>
        {testData}
      </p>
    </>
  )
}

export default App
