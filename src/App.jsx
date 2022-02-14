import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Coin from './Coin';


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log('Error'))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )


  return (
    <div className="coinApp">
      <div className="coinSearch">
        <h1 className="coinText">Search a currency</h1>
        <form>
          <input type="text" placeholder='Search' className='coinInput' onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
