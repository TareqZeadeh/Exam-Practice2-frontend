import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button ,Modal,FloatingLabel ,Form } from 'react-bootstrap'

class FavDrinks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDrinks: [],
            index: -1,
            drinkName: '',
            toShow: false,
            drinkObj: {},

        }
    }

    componentDidMount() {
        const { user } = this.props.auth0;

        axios
            .get(`http://localhost:3002/userDrinks`, { params: { email: user.email } })
            .then(result => {
                this.setState({
                    userDrinks: result.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteDrink = (idx) => {
        const { user } = this.props.auth0;
        axios
            .delete(`http://localhost:3002/deleteDrink/${idx}`, { params: { email: user.email } })
            .then(result => {
                this.setState({
                    userDrinks: result.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }



    updateDrink = (drink, idx) => {
        this.setState({
            index: idx,
            drinkName: drink.drinkName,
            toShow: true,
            drinkObj: drink,

        })


    }
    closeModal=()=>{
        this.setState({
           
            toShow: false,

        })
    }

    submitHandler = (event) =>{

        event.preventDefault();

        const newName=event.target.drinkName.value;
        const { user } = this.props.auth0;
        const newDrink ={
            drinkName : newName,
            drinkImg : this.state.drinkObj.drinkImg
        }
        const params ={
            email : user.email,
            drinkObj : newDrink,
        }

        axios
        .put(`http://localhost:3002/updateDrink/${this.state.index}`,params)
        .then(result =>{
            this.setState({
                userDrinks: result.data
            });
        })
        .catch(err => {
            console.log(err);
        });
        this.closeModal();
    }


    render() {
        return (
            <>
                {this.state.userDrinks.length !== 0 && this.state.userDrinks.map((drink, idx) => {

                    return (
                        <>
                            <Card style={{ width: '18rem', display: 'inline-block' }}>
                                <Card.Img variant="top" src={drink.drinkImg} />
                                <Card.Body>
                                    <Card.Title>{drink.drinkName}</Card.Title>
                                    <Button onClick={() => { this.deleteDrink(idx) }} variant="danger">Delete</Button>
                                    <Button onClick={() => { this.updateDrink(drink, idx) }} variant="primary">Update</Button>
                                </Card.Body>
                            </Card>


                            {this.state.toShow && <Modal show={this.state.toShow} onHide={this.closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Form</Modal.Title>
                                </Modal.Header>
                                <Modal.Body><Form onSubmit={this.submitHandler}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" name="drinkName" defaultValue={this.state.drinkName} />
                                    </FloatingLabel>
                                    <Button variant="secondary" type='submit'>
                                        Update
                                    </Button>
                                </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.closeModal}>
                                        Close
                                    </Button>

                                </Modal.Footer>
                            </Modal>}
                        </>
                    )

                })}
            </>
        )
    }
}

export default withAuth0(FavDrinks);
