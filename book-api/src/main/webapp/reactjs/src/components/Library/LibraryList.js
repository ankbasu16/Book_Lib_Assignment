import React, {Component} from 'react';

import {connect} from 'react-redux';
import {deleteLibrary} from '../../services/index';

import './../../assets/css/Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

class LibraryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            libraries : [],

            currentPage : 1,
            librariesPerPage : 5,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllLibraries(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllLibraries(this.state.currentPage);
    }


    findAllLibraries(currentPage) {
        currentPage -= 1;
        axios.get("/libraries?pageNumber="+currentPage+"&pageSize="+this.state.librariesPerPage+"&sortBy=price&sortDir="+this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    libraries: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };



    deleteLibrary = (libraryId) => {
        this.props.deleteLibrary(libraryId);
        setTimeout(() => {
            if(this.props.libraryObject != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.findAllLibraries(this.state.currentPage);
            } else {
                this.setState({"show":false});
            }
        }, 1000);

    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);

            this.findAllLibraries(targetPage);

        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {

                this.findAllLibraries(firstPage);

        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {

                this.findAllLibraries(this.state.currentPage - prevPage);

        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.librariesPerPage);
        if(this.state.currentPage < condition) {

                this.findAllLibraries(condition);

        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.librariesPerPage)) {

                this.findAllLibraries(this.state.currentPage + 1);

        }
    };



    render() {
        const {libraries, currentPage, totalPages} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Library Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                       <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Library List
                        </div>

                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Description</th>
                                  <th>Books</th>



                                </tr>
                              </thead>
                              <tbody>
                                {
                                    libraries.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No Library Available.</td>
                                    </tr> :
                                    libraries.map((library) => (
                                    <tr key={library.id}>

                                        <td>{library.name}</td>
                                        <td>{library.description}</td>


                                        <td>
                                            <ButtonGroup>

                                                <Button size="sm" variant="outline-danger" onClick={this.deleteLibrary.bind(this, library.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {libraries.length > 0 ?
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                     }
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        libraryObject: state.library
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteLibrary: (libraryId) => dispatch(deleteLibrary(libraryId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList);