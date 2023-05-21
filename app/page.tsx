import MyButton from "@/components/MyOperationTypeButton";


interface TradeOrder {
  amount: number;
  tradeOrderType: string;
}

interface OperationType {
  name: string;
}

interface Deposit {
  amount: number;
  fromAddress: string;
}


const fetchOperationTypes = async (): Promise<OperationType[] | null> => {
  try {
    const API_URL = `${process.env.API_URL}OperationType`;

    const response = await fetch(API_URL);

    return await response.json();

  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const fetchHeaders = async (className: string): Promise<string[] | null> => {
  try {
    const API_URL = `${process.env.API_URL}Dictionary/headers?`;

    const response = await fetch(API_URL + new URLSearchParams({
      className: className
    }))

    return await response.json();

  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const fetchDeposits = async (): Promise<Deposit[] | null> => {
  try {
    const API_URL = `${process.env.API_URL}Deposit`;

    const response = await fetch(API_URL);

    return await response.json();

  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

async function Home() {

  const operationTypes = await fetchOperationTypes();

  let headers: string[] | null = null;

  if (operationTypes) {
    headers = await fetchHeaders(operationTypes[0].name);
  }

  let tableData = await fetchDeposits();


  return (
    <>
      {operationTypes !== null && operationTypes.length > 0 ? (
        operationTypes?.map((operationType, index) => (
          <MyButton key={index} >
            {operationType.name}
          </MyButton>
        ))

      ) : (
        <p>No trade operation types to display</p>
      )}

      <table>
        <thead>
          {headers !== null && headers.length > 0 ? (
            headers?.map(header => (
              <td> {header} </td>
            ))
          ) : (
            <td>No table headers to display</td>
          )}
        </thead>
        <tbody>
          {tableData !== null && tableData.length > 0 ? (
            tableData?.map(item => (
              <tr>
                <td> {item.amount} </td>
                <td> {item.fromAddress} </td>
              </tr>
            ))
          ) : (
            <tr>No table data to display</tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Home
