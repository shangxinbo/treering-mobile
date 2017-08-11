import React, { Component } from 'react'
import { Text, Image, StyleSheet, ListView } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem } from 'native-base'

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 30,
    },
});

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
            list: [
                'Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can',
                'Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can',
                'Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can',
                'Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'
            ]
        }
    }
    componentDidMount() {
        //this.getData()
    }
    getData() {
        fetch('http://10.111.23.190:3000/login', {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                "name": "shangxinbo",
                "password": "shang123"
            })
        }).then(res => {
            console.log(res)
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
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.list)}
                        renderRow={(item) =>
                            <ListItem>
                                <Text>{item}</Text>
                            </ListItem>
                        }
                        renderLeftHiddenRow={data =>
                            <Button full>
                                <Icon active name="information-circle" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger>
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
