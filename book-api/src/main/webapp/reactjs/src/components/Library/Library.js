import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveLibrary, fetchLibrary, updateLibrary} from '../../services/index';

import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';

class Library extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            books: [],
            show : false
        };
        this.libraryChange = this.libraryChange.bind(this);
        this.submitLibrary = this.submitLibrary.bind(this);
    }

    initialState = {
        id:'', name:'', description:'', book:''
    };

    componentDidMount() {
        const libraryId = +this.props.match.params.id;
        if(libraryId) {
            this.findLibraryById(libraryId);
        }

        this.findAllBooks(libraryId); // to be modified
    }



    findAllBooks = (libraryId) => {
        axios.get("/libraries/"+libraryId+"/books")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    books: [{value:'', display:'Books'}]
                        .concat(data.map(book => {
                            return {value:book, display:book}
                        }))
                });
            });
    };



    findLibraryById = (libraryId) => {
        this.props.fetchLibrary(libraryId);
        setTimeout(() => {
            let library = this.props.libraryObject.library;
            if(library != null) {
                this.setState({
                    id: library.id,
                    name: library.name,
                    description: library.description,
                    book: library.book
                });
            }
        }, 1000);

    };

    resetLibrary = () => {
        this.setState(() => this.initialState);
    };



    submitLibrary = event => {
        event.preventDefault();

        const library = {
            name: this.state.name,
            description: this.state.description,
            book: this.state.book
        };

        this.props.saveLibrary(library);
        setTimeout(() => {
            if(this.props.savedLibraryObject.book != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);

        this.setState(this.initialState);
    };


    updateLibrary = event => {
        event.preventDefault();

        const library = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            book: this.state.book
        };
        const libraryId = +this.props.match.params.id;
        this.props.updateLibrary(libraryId);

        setTimeout(() => {
            if(this.props.updatedLibraryObject.book != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);

        this.setState(this.initialState);
    };

    libraryChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    libraryList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {name,description, book} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Library Updated Successfully." : "Library Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Library" : "Add New Library"}
                    </Card.Header>
                    <Form onReset={this.resetLibrary} onSubmit={this.state.id ? this.updateLibrary : this.submitLibrary} id="libraryFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="name"
                                        value={name} onChange={this.libraryChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Library name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="description"
                                        value={description} onChange={this.libraryChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Library description" />
                                </Form.Group>







                                 <Form.Group as={Col} controlId="formGridBook">
                                                                     <Form.Label>Book</Form.Label>
                                                                     <Form.Control required autoComplete="off"
                                                                         type="test" name="book"
                                                                         value={book} onChange={this.libraryChange}
                                                                         className={"bg-dark text-white"}
                                                                         placeholder="Enter book" />
                                                                 </Form.Group>
                            </Form.Row>


                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.libraryList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Library List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        savedLibraryObject: state.library,
        libraryObject: state.library,
        updatedLibraryObject: state.library
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveLibrary: (library) => dispatch(saveLibrary(library)),
        fetchLibrary: (libraryId) => dispatch(fetchLibrary(libraryId)),
        updateLibrary: (libraryId) => dispatch(updateLibrary(libraryId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);