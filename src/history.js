import React, { Component } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Toast, Spinner } from 'native-base'

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 30,
    }
})

export default class History extends Component {
    static navigationOptions = {
        tabBarLabel: 'history',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./assets/img/history_bottom.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        ajax({
            url: '/history/list',
            data: {},
            success: data => {
                this.setState({
                    list: data.data,
                    loading: false
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
                        <Title>历史记录</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content >
                    {this.state.loading ? (
                        <Spinner color='blue' />
                    ) : (
                            <List
                                dataArray={this.state.list}
                                renderRow={(item) =>
                                    <ListItem>
                                        <Text>{item.text}</Text>
                                        <Text>{item.status==1?'完成':'失败'}</Text>
                                        <Text>{item.end_time}</Text>
                                    </ListItem>
                                }
                            />
                        )
                    }
                </Content>
            </Container>
        )
    }
}