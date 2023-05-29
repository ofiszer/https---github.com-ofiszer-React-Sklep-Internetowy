import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import data from '../data';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/produkty');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Polecane produkty</h1>
      <div className="produkty">
        {products.map((produkt) => (
          <div className="produkt" key={produkt.klucz} onMouseEnter={() => setHoveredProduct(produkt.klucz)}
          onMouseLeave={() => setHoveredProduct(null)}>
            <Link to={`/api/produkt/${produkt.klucz}`}>
              <img src={produkt.obrazek} alt={produkt.nazwa} />
            </Link>
            <div className="produkt-info">
              <Link to={`/produkt/${produkt.klucz}`}>
                <p>{produkt.nazwa}</p>
              </Link>
              <p>
                <strong>{produkt.cena} PLN</strong>
              </p>
              {hoveredProduct === produkt.klucz && (
              <div className="button-container">
                <button className="koszyk-button">Do koszyka</button>
                <Link to={`/api/produkt/${produkt.klucz}`}>
                  <button className="szczegoly-button">Szczegóły</button>
                </Link>
              </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
