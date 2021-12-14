import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCurrentList, addToSavedList } from "../redux/actions";

function CurrentPriceTable() {
  const dispatch = useDispatch();
  const { currentPriceList } = useSelector((state) => state.currentPriceData);

  const deletePrice = (id) => {
    dispatch(removeFromCurrentList(id));
  };

  const addToSavedPriceTable = (data) => {
    dispatch(addToSavedList(data));
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-xs-6">
        <table class="table table-hover table-secondary">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Timestamp</th>
              <th scope="col">BitCoin</th>
              <th scope="col">USD</th>
              <th scope="col">GBP</th>
              <th scope="col">Euro</th>
              <th colSpan="2" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPriceList.slice(0, 20).map((row, index) => (
              <tr key={row.id}>
                <td>{index}</td>
                <th scope="row">{row.timestamp}</th>

                <td>1</td>
                <td>{row.usd.toLocaleString()}</td>
                <td>{row.gbp.toLocaleString()}</td>
                <td>{row.euro.toLocaleString()}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => deletePrice(row.id)}
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => addToSavedPriceTable(row)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrentPriceTable;
