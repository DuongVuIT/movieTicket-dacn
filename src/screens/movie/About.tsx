import IconHeader from '@components/IconHeader';
import ThemeContext from '@context/ThemeContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@type/navigation';
import {FONTSIZE, MARGIN, SPACING} from '@type/theme';
import React, {useContext} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const About = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
    iconHeader: {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_24 * 2,
    },
    imageBG: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    textContent: {
      marginTop: MARGIN.margin_10,
      fontSize: FONTSIZE.size_18,
      color: theme === 'dark' ? 'white' : 'black',
      textAlign: 'justify',
    },
    textTitle: {
      marginTop: MARGIN.margin_10,
      fontSize: FONTSIZE.size_22,
      color: theme === 'dark' ? 'white' : 'black',
      textAlign: 'justify',
      fontWeight: 'bold',
    },
  });
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.imageBG}
        source={require('@assets/image/about.jpeg')}>
        <View>
          <View style={styles.iconHeader}>
            <IconHeader name="arrow-left" action={() => navigation.goBack()} />
          </View>
        </View>
      </ImageBackground>
      <View>
        <Text style={styles.textContent}>Về chúng tôi</Text>
        <Text style={styles.textContent}>26/07/2002</Text>
        <View>
          <Text style={styles.textTitle}>LOTTIE MOVIE</Text>
          <Text style={styles.textContent}>
            Được biết đến với cụm rạp đầu tiên với 10 phòng chiếu vào năm 2002.
            Từ năm 2002 Lottie Movie là cụm rạp Việt Nam có sức phát triển mạnh
            mẽ, qua việc đắc địa của Thành Phố Hồ Chí Minh.
          </Text>
          <Text style={styles.textTitle}>MỤC TIÊU HOẠT ĐỘNG</Text>
          <Text style={styles.textContent}>
            Các mục tiêu này được thiết lập bởi Lottie Movie như là kim chỉ nam
            cho các Ban Quản Lý rạp để báo đảm trải nghiệm điện ảnh hoàn hảo cho
            khách hàng
          </Text>
          <Text style={styles.textContent}>
            + Phục vụ khách hàng: Chúng tôi cam kết chất lượng phục vụ theo tiêu
            chuẩn cao nhất qua việc thoả mãn các yêu cầu của khách hàng kịp
            thời, đầy đủ và chuyên nghiệp
          </Text>
          <Text style={styles.textContent}>
            + Không gian thoải mái: Chúng tôi cam kết mang đến một không gian
            sạch sẽ , thoải mái và thuận lợi, để khách hàng luôn cảm thấy được
            trân trọng và được phục vụ chu đáo.
          </Text>
          <Text style={styles.textContent}>
            + Địa điểm an toàn: Chúng tôi cam kết bảo đảm một không gian giải
            trí an ninh và an toàn để khách hàng quay lại thường xuyên
          </Text>
          <Text style={styles.textContent}>
            + Địa điểm an toàn: Chúng tôi cam kết bảo đảm một không gian giải
            trí an ninh và an toàn để khách hàng quay lại thường xuyên
          </Text>
          <Text style={[styles.textContent, {marginBottom: 20}]}>
            + Âm thanh hình ảnh: Chúng tôi cam kết cung cấp chất lượng âm thành
            và hình ảnh theo tiêu chuẩn cao nhằm gìn giữ, quảng bá và nâng cao
            trải nghiệm điện ảnh như chính sự kỳ vọng của các nhà làm phim và
            khán giả xem phim
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
