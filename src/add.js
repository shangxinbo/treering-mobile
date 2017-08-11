import React, { Component } from 'react'
import {Text, Image, StyleSheet} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem } from 'native-base'
export default class Add extends Component {
    render() {
        return (
            <Container>
            <Header>
                <Left></Left>
                <Body>
                    <Title>紧急任务</Title>
                </Body>
                <Right>
                    <Button transparent 
                        onPress={() => this.props.navigation.navigate('Add')}>
                        <Icon name='menu' />
                    </Button>
                </Right>
            </Header>
            <Content>
                <Text></Text>
            </Content>
        </Container>
        )
    }
}