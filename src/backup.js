import React, { Component } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, View, Toast, Spinner } from 'native-base'
import HTMLView from 'react-native-htmlview'
import showdown from 'showdown'
import Markdown from 'react-native-simple-markdown'

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 30,
    },
})

export default class Backup extends Component {
    static navigationOptions = {
        tabBarLabel: 'backup',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./assets/img/back_bottom.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            loading: true
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        ajax({
            url: '/memo/view',
            data: {},
            success: data => {
                //let converter = new showdown.Converter()
                //let html = converter.makeHtml(data.data)
                this.setState({
                    content: data.data,
                    loading: false,
                    edit: false
                })
            },
            error: err => {
                Toast.show({
                    text: err,
                    type: 'danger',
                    duration: 3000
                })
            }
        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left ></Left>
                    <Body>
                        <Title>备忘录</Title>
                    </Body>
                    <Right>
                        {this.state.edit ? (
                            <Button transparent>
                                <Icon name='edit' />
                            </Button>
                        ) : (
                                <Button transparent>
                                    <Icon name='add' />
                                </Button>
                            )
                        }
                    </Right>
                </Header>
                <Content>
                    {this.state.loading ? (
                        <Spinner color='blue' />
                    ) : (
                            <Markdown>
                                {this.state.content}
                            </Markdown>
                        )
                    }
                </Content>
            </Container>
        )
    }
}