import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native'
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PaymentScreen = (props) => {
    const RoutToAddPaymentMethod = () => {
        props.navigation.navigate('AddPaymentMethod')
    }
    return (
        <View style={{ width: windowWidth * 1.0, height: windowHeight * 1.0, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={{ width: windowWidth * 1.0, height: windowHeight * 1.0, backgroundColor: '#fff' }}>
                <View style={styles.ImageContainer}>
                    <ImageBackground resizeMode={'contain'} source={require('../images/paymentbanner.png')}
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
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Payment Methods</Text>
                        <View style={{ backgroundColor: 'white', width: windowWidth * 0.62 }}>
                            <Text style={{ fontSize: 15 }}>Your Privacy will be our Priorety</Text>
                        </View>
                    </View>
                    <View style={styles.iconscontainer}>
                        <Icon2
                            name='creditcard'
                            size={30}
                            color='#000'
                        />
                    </View>
                </View>

                <View style={styles.MethodContainer}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.methodType} onPress={RoutToAddPaymentMethod}>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon2
                                name='creditcard'
                                size={30}
                                color='#000'
                            />
                        </View>
                        <View>
                            <Text>Credit/Debit Card</Text>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon3
                                name='chevron-right'
                                size={30}
                                color='#000'
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.methodType}>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon4
                                name='google-wallet'
                                size={30}
                                color='#000'
                            />
                        </View>
                        <View>
                            <Text>googleWallet</Text>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon3
                                name='chevron-right'
                                size={30}
                                color='#000'
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.methodType}>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon4
                                name='amazon'
                                size={30}
                                color='#000'
                            />
                        </View>
                        <View>
                            <Text>AmazonPay</Text>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon3
                                name='chevron-right'
                                size={30}
                                color='#000'
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.methodType}>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon4
                                name='cc-mastercard'
                                size={30}
                                color='#000'
                            />
                        </View>
                        <View>
                            <Text>Mastercard</Text>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon3
                                name='chevron-right'
                                size={30}
                                color='#000'
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.methodType}>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon4
                                name='paypal'
                                size={30}
                                color='#000'
                            />
                        </View>
                        <View>
                            <Text>Paypal Pay</Text>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon3
                                name='chevron-right'
                                size={30}
                                color='#000'
                            />
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* <TouchableOpacity style={styles.OrderButtonContainer} activeOpacity={0.8}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Pay Now</Text>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>$30.00</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default PaymentScreen;

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
    MethodContainer: {
        marginTop: windowHeight * 0.02,
        // backgroundColor: 'gold',
        width: windowWidth * 0.9,
        height: windowHeight * 0.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    methodType: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        height: windowHeight * 0.08,
        width: windowWidth * 0.82,
        borderRadius: 50,
        elevation: 3
    },
    OrderButtonContainer: {
        flexDirection: 'row',
        backgroundColor: '#000',
        height: windowHeight * 0.10,
        width: windowWidth * 1.0,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

})
