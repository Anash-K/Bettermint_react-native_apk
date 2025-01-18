import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import FastImage, {ImageStyle as FastImageStyle} from 'react-native-fast-image';

interface CustomImageHandler {
  sourceImage: string | null;
  placeholderImage: ImageSourcePropType;
  imageStyle: StyleProp<FastImageStyle>;
}

const CustomImageHandler: React.FC<CustomImageHandler> = ({
  sourceImage,
  placeholderImage,
  imageStyle,
}) => {
  // Initially show the placeholder image
  const [imageUri, setImageUri] = useState<ImageSourcePropType>(
    sourceImage ? {uri: sourceImage} : placeholderImage,
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(!!sourceImage);



  // Event handlers for loading and error
  useEffect(() => {
    if (sourceImage) {
      setImageUri({uri: sourceImage});
      setIsError(false);
      setIsLoading(true); // Show loader while URI is loading
    } else {
      setImageUri(placeholderImage);
      setIsLoading(false);
    }
  }, [sourceImage, placeholderImage]);

  const handleError = () => {
    
    setImageUri(placeholderImage); // Show placeholder image if error occurs
    setIsError(true);
    setIsLoading(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator style={styles.loader} size="small" color="#20C997" />
      )}
      <FastImage
        source={[imageUri] as any} // Use imageUri state for source
        onError={handleError}
        onLoadEnd={handleLoadEnd}
        style={[styles.profilePic, imageStyle as FastImageStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  loader: {
    position: 'absolute',
  },
});

export default React.memo(CustomImageHandler);
