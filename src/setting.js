import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base'


export default class Setting extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left >
                        <Button transparent
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>设置</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Button block onPress={() => this.props.navigation.navigate('Do')}
                        style={{ marginTop: 20 }} >
                        <Text style={{ color: 'white' }}>做任务</Text>
                    </Button>
                    <Button block
                        style={{ marginTop: 20 }} >
                        <Text style={{ color: 'white' }}>退出</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}
