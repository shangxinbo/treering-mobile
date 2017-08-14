import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Root } from "native-base"

import Index from './index'
import History from './history'
import Add from './add'
import Login from './login'

const tabNav = TabNavigator(
    {
        Todos: { screen: Index },
        History: { screen: History }
    }, {
        tabBarOptions: {
            activeTintColor: '#e91e63',
            showIcon: true
        },
        swipeEnabled: false,
        tabBarPosition: 'bottom'
    }
)

const AppNavigator = StackNavigator(
    {
        Login: { screen: Login },
        Home: { screen: tabNav },
        Add: { screen: Add }
    }, {
        headerMode: 'none'
    }
)

export default () => <Root><AppNavigator /></Root>