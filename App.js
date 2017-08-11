import React from 'react'
import { AppRegistry } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Index from './src/index'
import History from './src/history'
import Add from './src/add'
import Login from './src/login'

const tabNav = TabNavigator({
    Todos: { screen: Index },
    History: { screen: History }
}, {
        tabBarOptions: {
            activeTintColor: '#e91e63',
            showIcon: true
        },
        swipeEnabled: false,
        tabBarPosition: 'bottom'
    })


const App = StackNavigator({
    Login: { screen: Login },
    Home: { screen: tabNav },
    Add: { screen: Add }
}, {
        headerMode: 'none'
    })

export default App