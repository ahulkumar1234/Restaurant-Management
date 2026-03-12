import './tables.css'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import axiosInstance from '../services/api';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const Tables = () => {

  const [tableModel, setTableModel] = useState(false);
  const handleOpenTableModel = () => {
    setTableModel(!tableModel);
  }

  const [loading, setLoading] = useState(false);

  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState({
    tableNumber: "",
    chairs: 1
  });

  const handleDeleteTable = async (id) => {
    try {
      await axiosInstance.delete(`/table/delete/${id}`);
      setTables(prev => prev.filter(table => table._id !== id));
      getTables();
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const handleCreateTable = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("/table/create", {
        tableNumber: Number(tableNumber.tableNumber),
        seats: tableNumber.chairs,
        isReserved: false
      });

      const newTable = response.data.newTable;

      setTables(prev => [...prev, newTable]);

      getTables();

      toast.success(response.data.message)

      setTableNumber({
        tableNumber: "",
        chairs: 1
      });

    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const getTables = async () => {
    try {
      const response = await axiosInstance.get("/table");
      setTables(response.data.allTables);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  return (
    <>
      <Navbar />
      <div className='tables-page'>
        <Sidebar />

        <div className="tables-content">
          <h1>Tables</h1>
          <div className="tables">
            {tables && tables.map(table => (
              <div className="tabel" key={table._id}>
                <img src="/assets/delete.png" alt="Delete" onClick={() => handleDeleteTable(table._id)} />
                <div>
                  <img className='vector' src="/assets/Vector.png" alt="" />
                  <span className='table-count'>{table.seats}</span>
                </div>

                <h2>Table</h2>
                <p>{table.tableNumber}</p>
              </div>
            ))}

            <div className="create-tabel" onClick={handleOpenTableModel}>
              <span>+</span>
            </div>

            {/* table-create */}
            <div className="table-create-model" style={{ display: tableModel ? "block" : "none" }}>
              <p className='table-head'>Table name (optional)</p>
              <div className="inp-div">
                <input
                  className='table-inp'
                  value={tableNumber.tableNumber}
                  onChange={(e) => setTableNumber({
                    ...tableNumber,
                    tableNumber: e.target.value
                  })}
                />
              </div>
              <div className="options">
                <p>Chair</p>
                <select
                  className='select'
                  value={tableNumber.chairs}
                  onChange={(e) => setTableNumber({ ...tableNumber, chairs: parseInt(e.target.value) })}
                >
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                </select>
              </div>
              <div className="btn-div">
                <button className={loading ? 'disabled' : 'create-btn'} onClick={handleCreateTable}>
                  {loading ? "Creating..." : "Create Table"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Tables