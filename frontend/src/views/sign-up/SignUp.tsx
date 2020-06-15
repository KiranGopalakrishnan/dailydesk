import * as React from 'react';
import styled from 'styled-components';
import {colors} from '../../common/Colors';
import { InputBox } from '../../common/components/InputBox/InputBox';
import { Button } from '../../common/components/Button/Button';
import { get } from '../../api/Api';
import { User, addUser } from '../../services/Users';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-style: normal;
    height: 100%;
`;
const Section = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${(props: {flex: number}) => props.flex};
    align-items: center;
`;

const Title = styled.h3`
    display: flex;
    flex-direction:
    font-weight: 300;
    flex: 1;
    height: 100%;
    border-bottom: 1px solid #F97F51;
    justify-content: center;
    padding: 8px 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 700px;
    border: solid 1px #e2e2e2;
    border-radius: 10px;
    padding: 0 80px;
    box-sizing: border-box;
`;

const Row = styled.section`
    display: flex;
    flex-direction: row;
    height: 94px;
    box-sizing: border-box;
    justify-content: center;
    padding: 16px 0;
`;


const Column = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const onAddUser = (user:User) => {
    addUser(user);
}

const SignUp: React.FC = () => {

    const [firstname,setFirstname] = React.useState('');

    const [lastname, setLastname] = React.useState('');

    const [email, setEmail] = React.useState('');

    const [password, setPassword] = React.useState('');

    return (
        <Container>
            <Form>
                <Section flex={2}>
                    <Title>Sign Up</Title>
                </Section>
                <Row>
                    <Column>
                        <InputBox
                            label="Firstname"
                            height={48}
                            width={258}
                            value={firstname}
                            onChange={setFirstname}
                            placeholder={'Firstname'}
                            color={' #F97F51'}
                        />
                    </Column>
                    <Column>
                        <InputBox
                            label="Lastname"
                            height={48}
                            width={258}
                            value={lastname}
                            onChange={setLastname}
                            placeholder={'Lastname'}
                            color={' #F97F51'}
                        />
                    </Column>
                </Row>
                <Row>
                    <InputBox
                        label="Email"
                        height={48}
                        value={email}
                        onChange={setEmail}
                        placeholder={'example@domain.com'}
                        color={' #F97F51'}
                    />
                </Row>
                <Row>
                    <InputBox
                        label="Password"
                        height={48}
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Password"
                        color={' #F97F51'}
                    />
                </Row>

                <Row>
                    <Button color={'#F97F51'} onClick={()=> onAddUser({
                        firstname,
                        lastname,
                        email,
                        password
                        })}>Signup</Button>
                </Row>
            </Form>
        </Container>
    );
};

export {SignUp};
