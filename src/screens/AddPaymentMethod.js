import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native'
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, themes } from '../constants/themes';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const AddPaymentMethod = (props) => {
    return (

        <ScrollView contentContainerStyle={{ width: windowWidth * 1.0, height: windowHeight * 1.0, backgroundColor: '#fff' }}>
            <View style={styles.ImageContainer}>
                <ImageBackground resizeMode={'contain'} source={require('../images/cardDetailsBanner.png')}
                    style={{
                        width: windowWidth * 0.9,
                        height: windowHeight * 0.2,
                        alignSelf: 'center'
                    }} >
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <Icon
                            name='arrow-left'
                            size={30}
                            color='#000'
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.contactSloganContainer}>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Card Details</Text>
                </View>
                <View style={styles.iconscontainer}>
                    <Icon3
                        name='account-details'
                        size={30}
                        color='#000'
                    />
                </View>
            </View>

            <View style={styles.inputContactContainer}>
                <View style={styles.inputAndLabelContainer}>
                    <View style={styles.LabelInput}>
                        <Text style={{ fontSize: 15 }}>Card Number</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholderTextColor={'#000'} placeholder={'Card Number'} keyboardType={'decimal-pad'} style={{ width: windowWidth * 0.75, alignSelf: 'center' }} autoFocus={true} />
                    </View>
                </View>
                <View style={styles.inputAndLabelContainer2}>
                    <View>
                        <View style={styles.LabelInput2}>
                            <Text style={{ fontSize: 15 }}>Expiry Date</Text>
                        </View>
                        <View style={styles.inputContainer2}>
                            <TextInput placeholderTextColor={'#000'} placeholder={'12/09/2012'} keyboardType={'email-address'} style={{ width: windowWidth * 0.30, alignSelf: 'center' }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.LabelInput2}>
                            <Text style={{ fontSize: 15 }}>CVC</Text>
                        </View>
                        <View style={styles.inputContainer2}>
                            <TextInput placeholderTextColor={'#000'} placeholder={'658'} keyboardType={'email-address'} style={{ width: windowWidth * 0.30, alignSelf: 'center' }} />
                        </View>
                    </View>
                </View>
                <View style={styles.inputAndLabelContainer}>
                    <View style={styles.LabelInput}>
                        <Text style={{ fontSize: 15 }}>Name</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholderTextColor={'#000'} placeholder={'Usman Farooq'} keyboardType={'email-address'} style={{ width: windowWidth * 0.75, alignSelf: 'center' }} />
                    </View>
                </View>
                <TouchableOpacity style={styles.OrderButtonContainer} activeOpacity={0.8}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Card</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

    )
}

export default AddPaymentMethod;

const styles = StyleSheet.create({
    ImageContainer: {
        // backgroundColor: '#eee',
        height: windowHeight * 0.3,
        width: windowWidth * 1.0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contactSloganContainer: {
        marginTop: windowHeight * 0.02,
        flexDirection: 'row',
        // backgroundColor: 'tomato',
        height: windowHeight * 0.1,
        width: windowWidth * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    iconscontainer: {
        alignSelf: 'center',
        // backgroundColor: 'gold'
    },
    inputContactContainer: {
        marginTop: windowHeight * 0.02,
        // backgroundColor: 'gold',
        width: windowWidth * 0.9,
        height: windowHeight * 0.5,
        alignSelf: 'center',

    },
    inputAndLabelContainer: {
        alignSelf: 'center',
        // backgroundColor: 'green',
        width: windowWidth * 0.8,
        height: windowHeight * 0.09,
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },

    LabelInput: {
        // backgroundColor: 'tomato',
        width: windowWidth * 0.2,
        // alignItems: 'center'
    },
    inputContainer: {
        backgroundColor: colors.GREY.PRIMARY,
        alignSelf: 'center',
        width: windowWidth * 0.8,
        borderRadius: 5
    },
    inputAndLabelContainer2: {
        marginTop: windowHeight * 0.02,
        flexDirection: 'row',
        alignSelf: 'center',
        // backgroundColor: 'green',
        width: windowWidth * 0.8,
        height: windowHeight * 0.09,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    LabelInput2: {
        // backgroundColor: 'tomato',
        width: windowWidth * 0.2,
        // alignItems: 'center'
        margin: 2
    },
    inputContainer2: {
        backgroundColor: colors.GREY.PRIMARY,
        alignSelf: 'flex-start',
        width: windowWidth * 0.35,
        borderRadius: 5
    },
    OrderButtonContainer: {
        marginTop: windowHeight * 0.02,
        backgroundColor: colors.ORANGE.PRIMARY,
        height: windowHeight * 0.07,
        width: windowWidth * .5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
})
