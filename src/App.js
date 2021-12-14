import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/actions";
import CurrentPriceTable from "./components/CurrentPriceTable";
import SavedPriceTable from "./components/SavedPriceTable";

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.fetchStatus);
  const { savedPriceList } = useSelector((state) => state.savedPriceData);
  const { currentPriceList } = useSelector((state) => state.currentPriceData);

  const handleClick = () => {
    dispatch(fetchData());
  };

  return (
    <div className="bg-dark bg-gradient mw-100 min-vh-100 text-white">
      <div className="container">
        <div className="row justify-content-center p-5">
          <div className="col-sm-6 title">
            <h2>Bitcoin Dashboard</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-4 col-xl-2">
            <button
              type="button"
              class="btn btn-primary bg-gradient btn-lg"
              onClick={handleClick}
            >
              Fetch Data
            </button>
          </div>
        </div>

        {error && (
          <div className="row justify-content-center mt-5">
            <div className="col-sm-6">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="row justify-content-center mt-5">
            <div className="col-sm-2">
              <strong>Loading...</strong>
              <div
                class="spinner-border ml-auto"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        )}
        <div className="row text-center mt-5">
          <div className="col-sm-12">
            <h2>Current Fetched Price Table</h2>
          </div>
        </div>

        {currentPriceList.length === 0 ? (
          <div className="row justify-content-center mt-5">
            <div className="col-sm-6">
              <div class="alert alert-secondary" role="alert">
                There is no currently fetched data available.Click the{" "}
                <strong>Fetch Data</strong> button to retrieve the current price
                of a Bitcoin"
              </div>
            </div>
          </div>
        ) : (
          <CurrentPriceTable />
        )}
        <div className="row text-center mt-5">
          <div className="col-sm-12">
            <h2>Saved Price Table</h2>
          </div>
        </div>
        {savedPriceList.length === 0 ? (
          <div className="row justify-content-center mt-5">
            <div className="col-sm-6">
              <div class="alert alert-secondary" role="alert">
                There is no data saved in the table.Click the{" "}
                <strong>save button</strong> to save the data.
              </div>
            </div>
          </div>
        ) : (
          <SavedPriceTable />
        )}
      </div>
    </div>
  );
}

export default App;
