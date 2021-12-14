import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromSavedList } from "../redux/actions";

function SavedPriceTable() {
  const dispatch = useDispatch();
  const { savedPriceList } = useSelector((state) => state.savedPriceData);

  const deletePrice = (id) => {
    dispatch(removeFromSavedList(id));
  };

  return (
    <div className="row justify-content-center mt-5 w-100">
      <div className="table-responsive">
        <table class="table table-hover table-secondary">
          <thead>
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">BitCoin</th>
              <th scope="col">US Dollar</th>
              <th scope="col">GBP</th>
              <th scope="col">Euro</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedPriceList.slice(0, 20).map((row, index) => (
              <tr key={row.id}>
                <th scope="row">{row.timestamp}</th>

                <td>1</td>
                <td>{row.usd}</td>
                <td>{row.gbp}</td>
                <td>{row.euro}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => deletePrice(row.id)}
                    class="btn btn-danger"
                  >
                    Delete
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

export default SavedPriceTable;
