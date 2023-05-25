import { useParams } from 'react-router-dom';
import data from "../data";
import RatingStars from './RatingStars';


function ProductDetails() {
    const params = useParams();
    const { nazwa } = params;
  
    const produkt = data.produkty.find((produkt) => produkt.nazwa === nazwa);
  
    if (!produkt) {
      return <div>Nie znaleziono produktu</div>;
    }
  
    return (
      <div>

        <h1>{produkt.nazwa}</h1>
        <img src={produkt.obrazek} alt={produkt.nazwa} />
  
        <h2>Opis:</h2>
        <p>{produkt.opis}</p>
  
        <RatingStars value={produkt.ocena} onChange={() => {}} />
  
        
      </div>
    );
  }
  
  export default ProductDetails;
  