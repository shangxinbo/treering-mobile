import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Container, Button, Icon, Fab, Toast } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

import ajax from './base/ajax'

export default class Do extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
        
    componentDidMount() {
        this.getCurrent()
    }

    getCurrent() {
        ajax({
            url: '/current',
            data: {},
            success: data => {
                this.setState({
                    text: data.data
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

    handle(status) {
        ajax({
            url: '/history/add',
            data: {
                text: this.state.text,
                status: status
            },
            success: data => {
                this.getCurrent()
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
                <View style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 300, height: 200, backgroundColor: 'green' }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.text}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Button block
                                style={{ flex: 1 }} onPress={() => this.handle(-1)}>
                                <Text style={{ color: 'white' }}>放弃</Text>
                            </Button>
                            <Button block
                                style={{ flex: 1 }} onPress={() => this.handle(1)}>
                                <Text style={{ color: 'white' }}>完成</Text>
                            </Button>
                        </View>
                    </View>
                    <Fab
                        direction="up"
                        containerStyle={{}}
                        onPress={() => this.props.navigation.goBack()}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight">
                        <Icon name="arrow-back" />
                    </Fab>
                </View>
            </Container>
        )
    }
}
