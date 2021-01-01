import React, { Component, useState } from 'react';
import { ITodo } from './types';
import logo from './logo.svg';
import './App.css';
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Card
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toEditorSettings } from 'typescript';
import { renderIntoDocument } from 'react-dom/test-utils';

interface ICopy {
  uniqueid: number;
  item: string | undefined;
}
const App = () => {

  const [text, setText] = useState<string>();
  const [list, setList] = useState<ICopy[]>([]);
  const [oldIndex, setIndex] = useState<number>(-1);
  const [flag, setFlag] = useState<boolean>(false);

  const changeHandler = (event: any) => {
    setText(event.target.value)
  }
  const onSubmit = (e: any) => {
    e.preventDefault();
    let copy = [...list];
    if (oldIndex !== -1 && flag === true) {
      copy = list.filter(copy => copy.uniqueid === oldIndex)
      let Notdata = list.filter(copy => copy.uniqueid !== oldIndex)
      if (copy !== null) {
        copy = [
          {
            uniqueid: oldIndex,
            item: text
          }]
      }
      setList(Notdata.length != 0 ? Notdata.concat(...copy) : copy);
    }
    else {
      copy = [...copy,
      {
        uniqueid: list.length,
        item: text
      }]
      setList(copy);
    }
    setFlag(false);
    setIndex(0);
    setText('');
  }

  const onEdit = (e: any) => {
    e.preventDefault();
    let value = e.target.value;
    setIndex(e.target.tabIndex);
    setText(value);
    setFlag(true);
  }

  const onDelete = (e: any) => {
    e.preventDefault();
    //let value = e.target.value;
    const index = e.target.value;
    const item = [...list];
    item.splice(index, 1);
    setList(item);
  }

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-md-center" style={{ margin: '5px' }}>
          <Col xs lg="4">
            <Form>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Enter Your task
              </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Enter task"
                    onChange={evt => changeHandler(evt)}
                    value={text}
                  />
                </Col>
                <Col xs="auto" className="my-1">
                  <Button type="submit"
                    onClick={onSubmit}>Submit</Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="8">
            <Card style={{ width: '44rem' }}>
              <Card.Header>Todo List</Card.Header>
              <ListGroup className="list-group-flush">
                {list.map((values, index) =>
                  <ListGroupItem>{values.item}
                    <div style={{ float: 'right' }}>
                      <Button variant="outline-primary"
                        style={{ margin: '2px' }}
                        value={values.item}
                        tabIndex={values.uniqueid}
                        onClick={onEdit}>Edit</Button>

                      <Button variant="outline-danger"
                        value={index}
                        onClick={onDelete}>Delete</Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  );
}
export default App;

