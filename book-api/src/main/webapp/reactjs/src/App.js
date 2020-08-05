import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Library from './components/Library/Library';
import LibraryList from './components/Library/LibraryList';
import Footer from './components/Footer';

export default function App() {

  const heading = "Welcome to Book API";
  const quote = "Library-Book API";
  const footer = "by Ankur Basu";

  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} className={"margin-top"}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                        <Route path="/add" exact component={Library}/>
                         <Route path="/list" exact component={LibraryList}/>

                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}
