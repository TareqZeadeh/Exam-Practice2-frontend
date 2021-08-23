import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allDrinks: [],
    }
  }

  componentDidMount() {

    axios
      .get(`http://localhost:3002/allDrinks`)
      .then(result => {
        this.setState({
          allDrinks: result.data
        });
      })
      .catch(err => {
        console.log(err);
      })

  }


  addDrink =(drink) =>{
    const {user} = this.props.auth0;
    const params ={
      email : user.email,
      drinkObj : drink
    }
      axios
      .post(`http://localhost:3002/addDrink`, params)
      .catch(err =>{
        console.log(err);
      })
  } 

  render() {
    return (
      <>
        {this.state.allDrinks.length  && this.state.allDrinks.map((drink, idx) => {

          return (
            <>
              <Card style={{ width: '18rem' , display : 'inline-block' }}>
                <Card.Img variant="top" src={drink.drinkImg} />
                <Card.Body>
                  <Card.Title>{drink.drinkName}</Card.Title>
                  <Button onClick={()=>{this.addDrink(drink)}} variant="primary">Add To Fav</Button>
                </Card.Body>
              </Card>

            </>
          )

        })}


      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);

