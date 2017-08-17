import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Root } from "native-base"

import Index from './index'
import Important from './important'
import History from './history'
import Backup from './backup'
import Add from './add'
import Login from './login'
import Setting from './setting'
import Do from './do'

const tabNav = TabNavigator(
    {
        Todos: { screen: Index },
        Important: { screen: Important },
        History: { screen: History },
        Backup: { screen: Backup }
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
        Home: { screen: tabNav },
        Login: { screen: Login },
        Add: { screen: Add },
        Setting: { screen: Setting },
        Do: { screen: Do }
    }, {
        headerMode: 'none'
    }
)

export default () => <Root><AppNavigator onNavigationStateChange={null} /></Root>