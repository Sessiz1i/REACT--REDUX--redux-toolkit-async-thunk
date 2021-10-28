import React, {useLayoutEffect, useRef, useState} from 'react';
import {Card, Form, Container, Button, ListGroup, Image, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {add, remove, toggle} from "./Features/Todo/todoSlice";
import {fetchUser} from "./Features/User/userSlice";


const App = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const todos = useSelector(state => state?.todos)
    const user = useSelector(state => state?.user)
    const todoInputRef = useRef('')

    //todo "VUE MODEL" işlemi
    const vModel = (event) => {
        setTitle(event.target.value)
    }
    const onSave = () => {
        dispatch(add(title))
        setTitle('')
    }
    const onDelete = (id) => {
        dispatch(remove(id))
    }
    const onToggle = (id) => {
        dispatch(toggle(id))
    }
    // TODO DOM oluşturulduktan sonra çalışır
    //  "VUE" deki "mounted()" fonksiyonu gibi

    React.useEffect(() => {

        todoInputRef.current.focus();

        user.data || dispatch(fetchUser())
        // eslint-disable-next-line
    }, [todos])

    // TODO DOM oluşturmadan önce çalışır
    //  "VUE" deki "created()" fonksiyonu gibi
    //  ayrıca "watch()" fonksiyonu gibide çalışır
    useLayoutEffect((effect) => {

        todoInputRef.current.focus();

        user.data || dispatch(fetchUser())

        // eslint-disable-next-line
    }, [todos])
    return (
        <div className="App">
            <Container>
                <Card className="mt-5 col-md-6 mx-auto">
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>{title}</Form.Label>
                            <Form.Control ref={todoInputRef} type="text" name="title" value={title} placeholder="Enter Todo"
                                          onChange={event => vModel(event)}/>
                        </Form.Group>
                        <Form.Group className="mb-3 float-end">
                            <Button onClick={onSave} variant="primary" type="submit">{"Add Todo"}</Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
                <Card className="mt-5 col-md-6 mx-auto">
                    <Card.Body>
                        <ListGroup>
                            <h2>Todos</h2>
                            {
                                todos.map(todo =>
                                    <ListGroup.Item key={todo.id}>
                                        <div className="d-flex justify-content-between">
                                            <Form.Check type="checkbox" id={todo.id}>
                                                <Form.Check.Input onChange={() => onToggle(todo.id)} type="checkbox" isValid/>{" "}
                                                <Form.Check.Label
                                                    className={todo.completed ? "text-success text-decoration-line-through" : ''}>{todo.title}</Form.Check.Label>
                                            </Form.Check>
                                            <Button onClick={() => onDelete(todo.id)}
                                                    variant="danger btn-sm">X Remove</Button>
                                        </div>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card.Body>
                </Card>
                <div className={"mt-5 col-md-6 mx-auto"}>
                    <h2>User Information</h2>
                    <Card className={""}>
                        <Card.Body>
                            <Form.Group className="float-end">
                                <Button onClick={() => dispatch(fetchUser())}
                                        variant={user.loading ? "danger disabled" : "primary"} type="submit">
                                    {user.loading ? "Loading..." : "Get User"}
                                </Button>
                            </Form.Group>
                            <Row>
                                <span>{user.error && user.error}</span>
                            </Row>
                        </Card.Body>
                        <Card.Body>
                            {user.data &&
                            <div>
                                <Image width={'150'} src={user.data.picture.large} alt={user.data.name.first}
                                       title={user.data.name.first}/>
                                <h6>Title: {user.data.name.title}</h6>
                                <h6>First Name: {user.data.name.first}</h6>
                                <h6>Last Name: {user.data.name.last}</h6>
                                <h6>Gender: {user.data.gender}</h6>
                                <h6>Email: {user.data.email}</h6>
                            </div>
                            }
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default App;
