import React, { Component } from 'react'
import { Text, Image, StyleSheet, ListView } from 'react-native'
import ajax from './base/ajax'
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Content,
    List,
    Toast,
    ListItem,
    Spinner
} from 'native-base'

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
})

export default class Important extends Component {
    static navigationOptions = {
        tabBarLabel: 'impotant',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./assets/img/important_bottom.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        )
    }

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            list: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        this.saveChange()
    }

    getData() {
        ajax({
            url: '/todos/find',
            data: {
                type: 1
            },
            success: data => {
                
                this.setState({
                    list: data.data,
                    loading: false
                })
                console.log(data.data.length)
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
            url: '/todos/save',
            data: {
                type: 1,
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

    del(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow()
        const newData = [...this.state.list]
        newData.splice(rowId, 1)
        this.setState({ list: newData })
    }

    add(content) {
        let list = [...this.state.list]
        list.unshift(content)
        this.setState({list})
        this.saveChange()
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left></Left>
                    <Body>
                        <Title>重要任务</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => this.props.navigation.navigate('Add', { add: (content) => {
                                this.add(content)
                            } })}>
                            <Icon name='add' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {this.state.loading ? (
                        <Spinner color='blue' />
                    ) : (
                            <List
                                dataSource={this.ds.cloneWithRows(this.state.list)}
                                renderRow={(item, secId, rowId) =>
                                    <ListItem>
                                        <Text>{item}</Text>
                                    </ListItem>
                                }
                                renderLeftHiddenRow={(data, secId, rowId, rowMap) => false}
                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                    <Button full danger onPress={() => this.del(secId, rowId, rowMap)}>
                                        <Icon active name="trash" />
                                    </Button>}
                                rightOpenValue={-75}
                            />
                        )
                    }
                </Content>
            </Container>
        )
    }
}
