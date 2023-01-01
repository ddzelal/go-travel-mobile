import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Attractions, Avatar, NotFound, Restaurants } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { Hotels } from '../assets';
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState('restaurants');
  const [isLoading, setIsLoading] = useState(false);
  const [minData, setMinData] = useState([]);
  const [bt_lat, setBt_lat] = useState(null);
  const [bt_lng, setBt_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bt_lat, bt_lng, tr_lat, tr_lng, type).then((data) => {
      setMinData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [bt_lat, bt_lng, tr_lat, tr_lng, type]);

  return (
    <SafeAreaView className='flex-1 bg-white relative'>
      <View className='flex-row items-center justify-between px-8 mt-10'>
        <View>
          <Text className='text-[40px] text-[#0B646B] font-bold'>Discover</Text>
          <Text className='text-[#527283] text-[36px]'>the beauty today</Text>
        </View>
        <View className='w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg'>
          <Image
            source={Avatar}
            className='w-full h-full rounded-md object-cover'
          />
        </View>
      </View>
      <View className='flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4'>
        <GooglePlacesAutocomplete
          placeholder='Search'
          GooglePlacesDetailsQuery={{ fields: 'geometry' }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
            setBt_lat(details?.geometry?.viewport?.southwest?.lat);
            setBt_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: 'AIzaSyA_KFap00WoyEqs93S-3x0AkNpkOUjCo5o',
            language: 'en',
          }}
        />
      </View>
      {/* Menu container */}

      {isLoading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#00ff00' />
        </View>
      ) : (
        <ScrollView>
          <View className='flex-row items-center justify-between px-8 mt-8'>
            <MenuContainer
              key={'hotels'}
              title='Hotels'
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={'attractions'}
              title='Attractions'
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={'restaurants'}
              title='Restaurants'
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>
          <View>
            <View className='flex-row items-center justify-between px-4 mt-8'>
              <Text className='text-[#2C7379] text-[28px] font-bold'>
                Top Tips
              </Text>
              <TouchableOpacity className='flex-row items-center space-x-2'>
                <Text className='text-[#A0C4C7] text-[20px] font-bold'>
                  Explore
                </Text>
                <FontAwesome
                  name='long-arrow-right'
                  size={24}
                  color='#A0C4C7'
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className='px-4 mt-8 flex-row items-center justify-evenly flex-wrap'>
            {minData?.length > 0 ? (
              <>
                {minData?.map((data, i) => {
                  return (
                    <ItemCardContainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : 'https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883__180.jpg'
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <View className='w-full h-[400px]  items-center space-y-8 justify-center'>
                  <Image className='w-32 h-32 object-cover' source={NotFound} />
                  <Text className='text-2xl text-[#428288] font-semibold'>
                    Ops...No Data Found{' '}
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
