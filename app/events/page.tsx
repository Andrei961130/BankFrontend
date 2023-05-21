interface TradeOrder {
  amount: number;
  tradeOrderType: string;
}

const fetchData = async (): Promise<TradeOrder[] | null> => {
  try {
    const API_URL = `${process.env.API_URL}TradeOrder`;
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

async function Home() {

  const data = await fetchData();

  return (
    <>
      <h1>Find in-depth information about Next.js features and API.</h1>

      {data !== null && data.length > 0 ? (
          data.map((tradeOrder, index) => (
            <h2 key={index}>
              Amount: {tradeOrder.amount}, Type: {tradeOrder.tradeOrderType}
            </h2>
          ))
        ) : (
          <p>No trade orders to display</p>
        )}
    </>
  )
}

export default Home
