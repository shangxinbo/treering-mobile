import React from 'react'
import { AppRegistry } from 'react-native'
import { TabNavigator } from 'react-navigation'
import Index from './src/index'
import History from './src/history'

const App = TabNavigator({
    Todos: { screen: Index },
    History: { screen: History }
},
    {
        tabBarOptions: {
            activeTintColor: '#e91e63',
            showIcon: true
        },
        swipeEnabled :false,
        tabBarPosition: 'bottom'
    })

export default App