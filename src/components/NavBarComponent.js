import React from 'react'
import {FormGroup, FormControl, Nav, Navbar, NavItem, Button, Form  } from 'react-bootstrap'
import {} from 'react-bootstrap'
export default ({title,onSearch,onRefresh}) => (
    <Navbar>

            <Navbar.Brand>

            </Navbar.Brand>
            <Navbar.Toggle />

        <Navbar.Collapse>
            <Form >
                <FormGroup>
                    <FormControl type="text" placeholder="Search" onChange={e => onSearch(e.target.value)}/>
                    <Button />
                </FormGroup>
            </Form>
            <Nav>
                <NavItem onClick={onRefresh}  href="#">{' '}Refresh</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);


/* <a href="#">{title}</a> <Glyphicon glyph="glyphicon glyphicon-refresh"/> */
