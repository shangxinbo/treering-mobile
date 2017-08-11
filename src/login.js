import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { Container, Content, Item, Label, Input, Form, Button } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
export default class Login extends Component {
    render() {
        return (
            <Container>
                <Grid>
                    <Row size={2}></Row>
                    <Row size={6}>
                        <Col size={2}></Col>
                        <Col size={8}>
                            <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('./assets/img/logo.png')} style={{ width: 150, height: 150 }} />
                            </Row>
                            <Row>
                                <Col>
                                    <Item inlineLabel>
                                        <Input placeholder='用户名' />
                                    </Item>
                                    <Item inlineLabel>
                                        <Input placeholder='密码' secureTextEntry={true} />
                                    </Item>
                                    <Button block style={{marginTop:20}}>
                                        <Text style={{color:'white'}}>登录</Text>
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
}