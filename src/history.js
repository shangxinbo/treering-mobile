import { Component } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { Container, Button } from 'native-base'

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
                source={require('./assets/img/todos_bottom.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        )
    }
    render() {
        return (
            <Container>
                <Button><Text>asdfasf</Text></Button>
            </Container>
        )
    }
}