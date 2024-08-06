import { useState } from "react";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";
import { Form, FormActions } from "../Form";
import { FormLabel } from "../FormLabel";
import { TextField } from "../TextField";
import { Figure, Heading, Image } from "./styles";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../mutations/addUser";
import PropTypes from 'prop-types';

export const FormRegister = ({ onRegister }) => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [addUser, { data, loading, error }] = useMutation(ADD_USER, {
        onCompleted: () => {
            onRegister()
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const registerUser = async (evt) => {
        evt.preventDefault();
        addUser({
            variables: {
                user
            }
        })
        console.log(user);
    };

    return (
        <section>
            <Figure>
                <Image src="/imgs/register.png" />
            </Figure>
            <Heading>
                Preencha os campos abaixo para criar sua conta corrente!
            </Heading>
            <Form onSubmit={registerUser}>
                <Fieldset>
                    <FormLabel>
                        Nome
                    </FormLabel>
                    <TextField
                        name="name"
                        placeholder="Digite seu nome completo"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </Fieldset>
                <Fieldset>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <TextField
                        name="email"
                        type="email"
                        placeholder="Digite seu email"
                        value={user.email}
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
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </Fieldset>
                <FormActions>
                    <Button type="submit">
                        Criar conta
                    </Button>
                </FormActions>
            </Form>
        </section>
    );
};

FormRegister.propTypes = {
    onRegister: PropTypes.func.isRequired,
};
