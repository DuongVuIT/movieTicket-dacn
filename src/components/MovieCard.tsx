import {FONTSIZE, MARGIN} from '@type/theme';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const MovieCard = (props: any) => {
  return (
    <View style={[styles.container, {maxWidth: props.cardWidth}]}>
      <View style={styles.boxContainer}>
        <Image
          style={[styles.imageStyle, {maxWidth: props.cardWidth}]}
          source={{uri: props.imagaPath}}
        />
        <View style={styles.containerTitle}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.titleMain}>{props.movieName}</Text>
          </View>
          <View style={styles.titlecontainer}>
            <Text style={styles.place}>{props.mall}</Text>
            <Text style={styles.dateContainer}>
              Seat: {props?.seat.slice(0, 3).join(', ')}
            </Text>
          </View>
          <View style={styles.titlecontainer}>
            <Text style={styles.time}>{props.time}</Text>
            <Text style={styles.dateContainer}>
              {props.date.date + ' ' + props.date.day}
            </Text>
          </View>
          <Text style={styles.nameContainer}>{props.userName}</Text>
          <Text style={styles.cityContainer}>{props.districts}</Text>
          <Image
            style={styles.imageSub}
            source={require('@assets/image/barcode.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  boxContainer: {
    marginTop: MARGIN.margin_20 * 2,
    height: 200,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    flexDirection: 'row',
  },
  imageStyle: {
    aspectRatio: 2 / 3,
    marginTop: 2,
    overflow: 'hidden',
    flex: 1,
    borderRadius: 20,
  },
  titlecontainer: {flexDirection: 'row', marginTop: 10, marginLeft: 2},
  titleMain: {color: 'white', fontSize: 18, marginLeft: 2},
  subTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
    marginRight: 20,
    marginTop: 2,
    flex: 1,
  },
  imageSub: {
    height: 30,
    width: 150,
    marginTop: 10,
    alignSelf: 'center',
  },
  cityContainer: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  nameContainer: {
    color: 'white',
    textAlign: 'center',
    fontSize: FONTSIZE.size_16,
    marginTop: 10,
  },
  dateContainer: {
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
    marginRight: 20,
    flex: 1,
  },
  time: {color: 'white', fontSize: 16},
  place: {
    color: 'white',
    fontSize: 16,
  },
  containerTitle: {flex: 2, flexDirection: 'column'},
});

export default MovieCard;