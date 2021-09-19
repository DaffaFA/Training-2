import { useContext, useEffect, useMemo, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import nProgress from "nprogress";
import { appContext } from "../context";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";

const ADD_CURRENCY = gql`
  mutation createCurrency($currency: CurrencyInput!) {
    createCurrency(currency: $currency) {
      id
      country
      value
    }
  }
`;

const DELETE_CURRENCY = gql`
  mutation deleteCurrency($id: Float!) {
    deleteCurrency(id: $id) {
      id
      country
      value
    }
  }
`;

/* eslint-disable jsx-a11y/anchor-is-valid */
const Table = () => {
  const [country, setCountry] = useState("");
  const [value, setValue] = useState("");
  const [createCurrency, createCurrencyData] = useMutation(ADD_CURRENCY);
  const [deleteCurrency, deleteCurrencyData] = useMutation(DELETE_CURRENCY);
  const { currencies, setCurrencies } = useContext(appContext);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const selectRow = (id) => {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };

  const deleteSelected = async () => {
    if (!selected) return;

    try {
      await deleteCurrency({ variables: { id: selected } });
      nProgress.start();
    } catch (e) {
      console.error(e);
    }

    nProgress.done();
    setSelected(null);
    setDeleteModal(false);
  };

  const deleteHandler = (element) => {
    element.preventDefault();
    if (!selected) return;
    setDeleteModal(true);
  }

  const addCurrency = async (element) => {
    element.preventDefault();
    try {
      await createCurrency({ variables: { currency: { country, value } } });
      nProgress.start();
    } catch (e) {
      console.error(e);
    }
    nProgress.done();
    setValue("");
    setCurrencies("");
  };

  useEffect(() => {
    if (!createCurrencyData.loading && createCurrencyData.data) {
      nProgress.done();
      setCurrencies(createCurrencyData.data?.createCurrency);
    }
  }, [createCurrencyData, setCurrencies, currencies]);

  useEffect(() => {
    if (!deleteCurrencyData.loading && deleteCurrencyData.data) {
      nProgress.done();
      setCurrencies(deleteCurrencyData.data?.deleteCurrency);
    }
  }, [deleteCurrencyData, setCurrencies, currencies]);

  const modalData = useMemo(() => {
    if (!selected) return;
    return currencies.find(currency => currency.id === selected);
  }, [selected, currencies]);

  const showModalHandler = (id) => {
    setSelected(id);
    setShowModal(true);
  };

  return (
    <>
    <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} currency={modalData} />
    <DeleteModal isOpen={deleteModal} onRequestClose={() => setDeleteModal(false)} setOpen={setDeleteModal} deleteHandler={deleteSelected} />
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block sm:px-6 lg:px-8 min-w-[600px] max-h-[400px]">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Country
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currencies?.map((currency) => (
                  <tr
                    key={currency.id}
                    className={`${
                      selected === currency.id ? "bg-gray-200" : ""
                    }`}
                    onClick={() => selectRow(currency.id)}
                    onDoubleClick={() => showModalHandler(currency.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {currency.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {currency.value}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">
                    <form onSubmit={addCurrency}>
                      <div className="flex justify-evenly items-center my-2">
                        <input
                          type="text"
                          placeholder="Country"
                          className="focus:outline-none border-b-2 border-solid border-gray-200 focus:border-gray-800 transition px-2 py-1 w-1/4"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                        <input
                          type="number"
                          min="1"
                          placeholder="Value"
                          className="focus:outline-none border-b-2 border-solid border-gray-200 focus:border-gray-800 transition px-2 py-1 w-1/4"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                        <button className="bg-blue-500 py-1 px-6 text-white rounded-3xl">
                          Add
                        </button>
                        <a
                          href="#"
                          className="bg-blue-500 py-1 px-6 text-white rounded-3xl"
                          onClick={(e) => deleteHandler(e)}
                        >
                          Delete
                        </a>
                      </div>
                    </form>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Table;
