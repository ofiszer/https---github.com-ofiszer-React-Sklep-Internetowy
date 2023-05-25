import { useState } from 'react';
import data from "../data";
import { Link } from 'react-router-dom';

function HomeScreen() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div>
      <h1>Produkty</h1>
      <div className="produkty">
        {data.produkty.map((produkt) => (
          <div
            className="produkt"
            key={produkt.klucz}
            onMouseEnter={() => setHoveredProduct(produkt.klucz)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link to={`/produkt/${produkt.klucz}`}>
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
                <div>
                  <button>Dodaj do koszyka</button>
                  <Link to={`/produkt/${produkt.klucz}`}>
                    <button>Szczegóły</button>
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
