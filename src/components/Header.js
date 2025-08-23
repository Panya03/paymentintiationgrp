function Header({ bankingType, setBankingType, search, setSearch, currentUser, usersData, switchUser, setSelectedAccount, setShowTxModal }) {
  return (
    <header className="header">
      <div className="header-left">
        <select
          value={bankingType}
          onChange={(e) => {
            setBankingType(e.target.value);
            setSelectedAccount && setSelectedAccount(null);
            setShowTxModal && setShowTxModal(false);
          }}
          className="banking-dropdown"
        >
          <option>Priority Banking</option>
          <option>Personal Banking</option>
          <option>NRI Banking</option>
          <option>Business Banking</option>
        </select>
      </div>
      <div className="header-right">
        <select className="country-dropdown">
          <option>India</option>
          <option>USA</option>
          <option>UK</option>
          <option>Singapore</option>
        </select>
        <input
          type="text"
          placeholder="Search account..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <div className="profile">
          <div className="avatar">{currentUser.name[0]}</div>
          <span className="username">{currentUser.name}</span>
          <select className="user-switcher" onChange={(e) => switchUser(usersData[e.target.value])}>
            {usersData.map((u, idx) => (
              <option key={idx} value={idx}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
