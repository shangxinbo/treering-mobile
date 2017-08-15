import React, { Component } from 'react'
import { Text, Image, StyleSheet, ListView } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Toast, Spinner } from 'native-base'


const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 30,
    },
})


export default class ChildView extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        this.saveChange()
    }
    
    del(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow()
        const newData = [...this.state.list];
        newData.splice(rowId, 1);
        this.setState({ list: newData })
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
                        <Title>{this.props.title}</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content >
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.list)}
                        renderRow={(item) =>
                            <MyList item={item} />
                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={() => this.del(secId, rowId, rowMap)}>
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
