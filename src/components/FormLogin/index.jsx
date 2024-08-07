import { useState } from "react";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";
import { Form, FormActions } from "../Form";
import { FormLabel } from "../FormLabel";
import { TextField } from "../TextField";
import { Figure, Heading, Image } from "./styles";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../mutations/login";
import PropTypes from 'prop-types';

export const FormLogin = ({ onRegister }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [login, { data, loading, error }] = useMutation(LOGIN, {
        onCompleted: (data) => {
            sessionStorage.setItem('token', data.login.accessToken)
            onRegister()
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const loginUser = (evt) => {
        evt.preventDefault();
        login({
            variables: {
                credentials
            }
        });
    };

    return (
        <section>
            <Figure>
                <Image src="/imgs/login.png" />
            </Figure>
            <Heading>
                Preencha os campos abaixo para efetuar login!
            </Heading>
            <Form onSubmit={loginUser}>
                <Fieldset>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <TextField
                        name="email"
                        type="email"
                        placeholder="Digite seu email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </Fieldset>
                <Fieldset>
                    <FormLabel>
                        Senha
                    </FormLabel>
                    <TextField
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </Fieldset>
                <FormActions>
                    <Button type="submit">
                        Efetuar login
                    </Button>
                </FormActions>
            </Form>
        </section>
    );
};

FormLogin.propTypes = {
    onRegister: PropTypes.func.isRequired,
};
