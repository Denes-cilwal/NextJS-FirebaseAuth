import { useState } from 'react';
import { useRouter } from 'next/router';
import  {useAuth}  from '../src/context/AuthUserContext';


import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState(null);
    const { createUserWithEmailAndPassword } = useAuth();

    // handleSubmit
    const onSubmit = event => {
        setError(null)
        if(currentPassword === confirmPassword)
            createUserWithEmailAndPassword(email, currentPassword)
                .then(authUser => {
                    console.log("User has been created in Firebase")
                    router.push("/logged_in");
                })
                .catch(error => {
                    setError(error.message)
                });
        else
            setError("Password do not match")
        event.preventDefault();
    };

    return (
        <Container className="text-center" style={{ padding: '40px 0px'}}>
            <Row>
                <Col>
                    <Form  onSubmit={onSubmit}>
                        { error && <Alert color="danger">{error}</Alert>}
                        <FormGroup row>
                            <Label for="signUpEmail" sm={4}>Email</Label>
                            <Col sm={8}>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    name="email"
                                    id="signUpEmail"
                                    placeholder="Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="signUpPassword" sm={4}>Password</Label>
                            <Col sm={8}>
                                <Input
                                    type="password"
                                    name="passwordOne"
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.target.value)}
                                    id="signUpPassword"
                                    placeholder="Password" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="signUpPassword2" sm={4}>Confirm Password</Label>
                            <Col sm={8}>
                                <Input
                                    type="password"
                                    name="password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    id="signUpPassword2"
                                    placeholder="Password" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Button>Sign Up</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp;
