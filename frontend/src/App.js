import { useQuery, gql } from "@apollo/client";
import { useContext, useEffect } from "react";
import nProgress from "nprogress";
import Table from "./components/Table";
import { appContext } from "./context";

const CURRENCIES_QUERY = gql`
  query getCurrecies {
    currencies {
      id
      country
      value
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(CURRENCIES_QUERY);
  const { setCurrencies } = useContext(appContext);

  useEffect(() => {
    nProgress.start();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      nProgress.done();
      setCurrencies(data.currencies);
    }
  }, [loading, data, setCurrencies]);


  if (error) console.error(error);
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {!loading && <Table currencies={data.currencies} />}
    </div>
  );
};

export default App;
