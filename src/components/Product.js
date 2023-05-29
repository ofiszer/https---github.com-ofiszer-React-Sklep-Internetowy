import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Product(props){
    const {produkt} = props;

    
    //return(
      //  <div className="product" key={produkt.klucz}>
        //    <Link to={`/product/${product.klucz}`}>
            //    <img src={produkt.obrazek} alt={produkt.nazwa}/>
          //  </Link>
  //      <div className="product-info" key={produkt.klucz}>
    //        <Link to={`/product/${product.klucz}`}>
      //          <p>{produkt.nazwa}</p>
        //    </Link>
    //        <p>{produkt.cena}</p>
      //      <button>Do koszyka</button>
    //    </div>
      //  </div>
    //);

    return(
        <Card key={produkt.klucz}>
            <Link to={`/produkt/${produkt.klucz}`}>
                <img src={produkt.obrazek} className="card-img-top" alt={produkt.nazwa}/>
            </Link>
            <Card.Body>
            <Link to={`/produkt/${produkt.klucz}`}>
                <Card.Title>{produkt.nazwa}</Card.Title>
            </Link>
            <Card.Text>{produkt.cena}</Card.Text>
            <Button>Do koszyka</Button>
        </Card.Body>
        </Card>
    );
}
export default Product;