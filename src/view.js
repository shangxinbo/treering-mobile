import React, { Component } from 'react'
import { Text, StyleSheet, ListView } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem } from 'native-base'


const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 30,
    },
})


export default class ChildView extends Component {

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            list: this.props.navigation.state.params.item.children,
            title: this.props.navigation.state.params.item.father
        }
    }

    componentDidUpdate() {
        this.saveChange()
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

    del(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow()
        const newData = [...this.state.list];
        newData.splice(rowId, 1);
        this.setState({ list: newData })
        // let list = [...this.props.navigation.state.params.list]
        // list[this.props.navigation.state.params.index] = {
        //     father: this.state.title,
        //     children: this.state.list
        // }
        
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left >
                        <Button transparent
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.state.title}</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.list)}
                        renderRow={(item) =>
                            <ListItem>
                                <Text>{item}</Text>
                            </ListItem>
                        }
                        renderLeftHiddenRow={() => false}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={() => this.del(secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>}
                        rightOpenValue={-75}
                    />
                </Content>
            </Container>
        )
    }
}
