import { useParams } from 'react-router-dom';
import RatingStars from "./RatingStars";
import data from "../data";
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';

function ProductScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const params = useParams();
  const { klucz } = params;

  // Pobierz informacje o produkcie na podstawie klucza
  const produkt = data.produkty.find((produkt) => produkt.klucz === klucz);

  if (!produkt) {
    return <div>Nie znaleziono produktu</div>;
  }


  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === produkt._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/produkty/${produkt._id}`);
    if (data.dostepnych < quantity) {
      window.alert('Brak w magazynie');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...produkt, quantity: 1 },
    });
  };

  return (
    <div>
      <h1>{produkt.nazwa}</h1>
      <h3>Ocena:</h3>
      <RatingStars value={produkt.ocena} onChange={() => {}} />

      <h3>Opinie:</h3>

      <h3>Opis:</h3>
      <p>{produkt.opis}</p>
      <button onClick={addToCartHandler}>Dodaj do koszyka</button>
    </div>
  );
}

export default ProductScreen;
