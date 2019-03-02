import React, { Component } from 'react';
import { LoginWrapper } from '../../theme/globalStyles';
import styled from 'styled-components';

const FormWrapper = styled.div`
    width: 20%;
    height: auto;
`;

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: false,
        }
    }

    render() {
        return (
            <LoginWrapper>
                <FormWrapper>
                    <form>
                        <label for="name">Name</label>
                        <input class="form-control" type="text" id="name" />

                        <label for="email">Email address</label>
                        <input class="form-control" type="email" id="email" />

                        <label>
                            <input type="checkbox" /> Remember me
                        </label>

                        <label>
                            <input type="radio" id="herp" name="herpderp" checked /> Herp
                        </label>
                        <label>
                            <input type="radio" id="derp" name="herpderp" /> Derp
                        </label>
                        <button class="btn" type="submit">Submit</button>
                    </form>
                </FormWrapper>
            </LoginWrapper>
        )
    }
}