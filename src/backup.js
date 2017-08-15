import React, { Component } from 'react'
import { Text, Image, StyleSheet, WebView, Linking } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Content, View, Toast, Spinner } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import showdown from 'showdown'
import ajax from './base/ajax'
showdown.setFlavor('github')

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

    mdToHtml() {
        let converter = new showdown.Converter()
        let html = converter.makeHtml(this.state.content)
        return `<html>
                    <head>
                        <link href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.8.0/github-markdown.min.css" rel="stylesheet" type="text/css" />
                    </head>
                    <body  class="markdown-body">${html}</body>
                </html>`
    }

    saveAndView() {
        ajax({
            url: '/memo/save',
            data: {
                content: this.state.content,
            },
            success: data => {
                this.setState({ edit: false })
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
                            <Button transparent onPress={() => this.saveAndView()}>
                                <Icon name='eye' />
                            </Button>
                        ) : (
                                <Button transparent onPress={() => this.setState({ edit: true })}>
                                    <Icon name='create' />
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
                            {this.state.edit ? (
                                <Row>
                                    <Input
                                        style={{ flex: 1 }}
                                        blurOnSubmit={true}
                                        value={this.state.content}
                                        onChangeText={(text) => this.setState({ content: text })}
                                        multiline={true} />
                                </Row>
                            ) : (
                                    <Row size={2}>
                                        <WebView
                                            ref={(ref) => { this.webview = ref; }}
                                            source={{ html: this.mdToHtml() }}
                                            onNavigationStateChange={(event) => {
                                                this.webview.stopLoading()
                                                Linking.openURL(event.url)
                                            }} />
                                    </Row>
                                )
                            }
                        </Grid>
                    )
                }
            </Container>
        )
    }
}