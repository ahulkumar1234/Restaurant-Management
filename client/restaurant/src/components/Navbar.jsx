import "./Navbar.css"

const Navbar = ({ search, setSearch }) => {
  return (
    <div className='Navbar'>
      <img src="/assets/Icon button.png" alt="Restaurant Logo" />
      <div className="search-container">
        <input className='navSearch' type="text" placeholder='Filter...' onChange={(e) => { setSearch(e.target.value) }} value={search} />
        <img className="dropdown" src="/src/assets/Frame 3.png" alt="" />
      </div>
    </div>
  )
}

export default Navbar