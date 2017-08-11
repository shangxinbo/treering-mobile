import React, { Component } from 'react'
import { Text, Image } from 'react-native'
import { Container, Item, Input, Button } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

import ajax from './base/ajax'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row size={2}></Row>
                    <Row size={6}>
                        <Col size={2}></Col>
                        <Col size={8}>
                            <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    source={require('./assets/img/logo.png')}
                                    style={{ width: 150, height: 150 }} />
                            </Row>
                            <Row>
                                <Col>
                                    <Item inlineLabel>
                                        <Input
                                            placeholder='用户名'
                                            onChangeText={(text) => this.setState({ username: text })} />
                                    </Item>
                                    <Item inlineLabel>
                                        <Input
                                            placeholder='密码'
                                            secureTextEntry={true}
                                            onChangeText={(text) => this.setState({ password: text })} />
                                    </Item>
                                    <Button block
                                        style={{ marginTop: 20 }} onPress={() => this.submit()}>
                                        <Text style={{ color: 'white' }}>登录</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col size={2}></Col>
                    </Row>
                    <Row size={2}></Row>
                </Grid>
            </Container>
        )
    }

    submit() {

        ajax({
            url: '/login',
            data: {
                username: 'shangxinbo',
                password: 'shang123'
            },
            success: data => {
                console.log(234)
            },
            error: err => {
                console.log(123)
                console.log(err)
            }
        })

    }
}