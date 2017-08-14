import React, { Component } from 'react'
import { Text, Image, StyleSheet, ListView } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem } from 'native-base'

import ajax from './base/ajax'

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 30,
    },
})

function MyList(props) {
    let item = props.item
    if (item instanceof Object) {
        return (
            <ListItem>
                <Text>{item.father}</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
        )
    } else {
        return (
            <ListItem>
                <Text>{item}</Text>
            </ListItem>
        )
    }
}

export default class Index extends Component {
    static navigationOptions = {
        tabBarLabel: 'todos',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./assets/img/todos_bottom.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        )
    }

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params)
        this.getData()
    }
  
    componentDidUpdate() {
        this.saveChange()
    }

    getData() {
        ajax({
            url: '/todos/list',
            data: {},
            success: data => {
                this.setState({ list: data.data })
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

    saveChange() {
        ajax({
            url: '/todos/saveChange',
            data: {
                type: 0,
                arr: this.state.list
            },
            success: data => {
                //console.log(data)
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

    del(data, secId, rowId) {
        this.setState((prevState) => {
            let list = prevState.list
            list.splice(rowId, 1)
            return { list: list }
        })
    }

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
                            onPress={() => this.props.navigation.navigate('Add', { list: this.state.list })}>
                            <Icon name='add' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.list)}
                        renderRow={(item) =>
                            <MyList item={item} />
                        }
                        renderLeftHiddenRow={data =>
                            <Button full >
                                <Icon active name="information-circle" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId) =>
                            <Button full danger onPress={() => this.del(data, secId, rowId)}>
                                <Icon active name="trash" />
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </Content>
            </Container>
        )
    }
}
