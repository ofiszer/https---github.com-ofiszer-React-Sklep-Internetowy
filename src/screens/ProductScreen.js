import { useParams } from 'react-router-dom';
import RatingStars from "./RatingStars";
//import data from "../data";
import { useContext, useReducer, useEffect } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import Product from '../components/Product';
//import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const params = useParams();
  const { klucz } = params;


  const [{ loading, error, produkt}, dispatch] =
    useReducer(reducer, {
      produkt: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/produkt/klucz/${klucz}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [klucz]);
  /*const [{ loading, error, produkt}, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/produkty/klucz/${klucz}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [klucz]);*/
  // Pobierz informacje o produkcie na podstawie klucza

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
/*
 return (
    <div>
      <h1>{produkt.nazwa}</h1>
      <img src={produkt.obrazek} alt={produkt.nazwa}/>
      <h3>Ocena:</h3>
      <RatingStars value={produkt.ocena} onChange={() => {}} />

      <h3>Opinie:</h3>
      <p>{produkt.opinie}</p>
      <h3>Opis:</h3>
      <p>{produkt.opis}</p>
      <button onClick={addToCartHandler}>Dodaj do koszyka</button>
    </div>
  );*/
  return loading ? (
    <div>Ładowanie...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div><h1>{produkt.nazwa}</h1>
    <img src={produkt.obrazek} alt={produkt.nazwa}/>
    <h3>Ocena:</h3>
    <RatingStars value={produkt.ocena} onChange={() => {}} />

    <h3>Opinie:</h3>
    <p>{produkt.opinie}</p>
    <h3>Opis:</h3>
    <p>{produkt.opis}</p>
    <button onClick={addToCartHandler}>Dodaj do koszyka</button></div>
  );
}

export default ProductScreen;
