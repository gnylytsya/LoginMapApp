import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform,
} from 'react-native';

import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
//const LATITUDE = 37.78825;
//const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class AnimatedMarkers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinate: new AnimatedRegion({
                latitude: null,
                longitude: null,
                error: null,
            }),
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let coordinate = {...this.state.coordinate};
                coordinate.latitude = position.coords.latitude;
                coordinate.longitude = position.coords.longitude;
                coordinate.error = null;
                this.setState({coordinate});
            },
            (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
    }


    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.coordinate.latitude,
                        longitude: this.state.coordinate.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >

                    <MapView.Marker
                        coordinate={this.state.coordinate}
                    >
                    <View style={styles.radius}>
                        <View style={styles.marker}/>
                    </View>
                    </MapView.Marker>
                </MapView>
            </View>
        );
    }
}

AnimatedMarkers.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    }
});

export default AnimatedMarkers;