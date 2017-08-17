import React, { Component } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input, Toast } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    submit() {
        if (!this.state.content) return false
        let type = this.props.navigation.state.params.type
        this.props.navigation.state.params.add(this.state.content)
        this.props.navigation.goBack()
        // ajax({
        //     url: '/todos/create',
        //     data: {
        //         type: type,
        //         text: this.state.content
        //     },
        //     success: data => {
        //         if (type) {
        //             this.props.navigation.navigate('Important')
        //         } else {
        //             this.props.navigation.goBack()
        //             //this.props.navigation.navigate('Home')
        //         }

        //     },
        //     error: err => {
        //         Toast.show({
        //             text: err,
        //             type: 'danger',
        //             duration: 3000
        //         })
        //     }
        // })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>添加任务</Title>
                    </Body>
                </Header>
                <Content>
                    <Item regular>
                        <Input
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(content) => this.setState({ content })}
                            placeholder='输入任务' />
                    </Item>
                    <Grid>
                        <Col size={1}></Col>
                        <Col size={8} style={{ padding: 10 }}>
                            <Button block onPress={() => this.submit()}>
                                <Text style={{ color: 'white' }}>提交</Text>
                            </Button>
                        </Col>
                        <Col size={1}></Col>
                    </Grid>
                </Content>
            </Container>
        )
    }
}