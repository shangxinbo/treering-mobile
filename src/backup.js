import React, { Component } from 'react'
import { Text, Image, StyleSheet, WebView } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, View, Toast, Spinner } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import showdown from 'showdown'
showdown.setFlavor('github')

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 30,
    },
})

const style_markdown = StyleSheet.create({
    h2: {
        fontSize: 58
    },
    tr: {
        display: 'flex'
    },
    td: {
        flex: 1
    }
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
                let converter = new showdown.Converter()
                let html = converter.makeHtml(data.data)
                html = `<html>
                            <head>
                                <link href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.8.0/github-markdown.min.css" rel="stylesheet" type="text/css" />
                            </head>
                            <body  class="markdown-body">${html}</body>
                        </html>`
                this.setState({
                    content: html,
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
            <Container style={{ flex: 1 }}>
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
                {this.state.loading ? (
                    <Content>
                        <Spinner color='blue' />
                    </Content>
                ) : (
                        <Grid>
                            <Row size={2}>
                                <WebView source={{ html: this.state.content }}></WebView>
                            </Row>
                        </Grid>
                    )
                }

            </Container>
        )
    }
}