import React, { Component } from 'react'
import { Text } from 'react-native'
import { Icon, List, Right, ListItem } from 'native-base'

export default class MyList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    viewChild() {
        this.props.navigation.navigate('ViewChild', { item: this.props.item,list:this.props.list,index:this.props.rowId })
    }

    render() {
        let item = this.props.item
        if (item instanceof Object) {
            return (
                <ListItem>
                    <Text>{item.father}</Text>
                    <Right>
                        <Icon name="arrow-forward" onPress={() => this.viewChild()} />
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
}