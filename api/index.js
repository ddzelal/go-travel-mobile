import axios from 'axios';

export const getPlacesData = async (bt_lat, bt_lng, tr_lat, tr_lng, type) => {
  console.log(type, 'TYPE U API');
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bt_lat ? bt_lat : '43.1215350316235',
          tr_latitude: tr_lat ? tr_lat : '43.16293153798583',
          bl_longitude: bt_lng ? bt_lng : '20.48478133436635',
          tr_longitude: tr_lng ? tr_lng : '20.54606440660247',
          limit: '200',
          currency: 'USD',
          open_now: 'false',
          lang: 'en_US',
        },
        headers: {
          'X-RapidAPI-Key':
            '00fbe72b17msh11c09355a17bbe8p185ad3jsn190ba7812d5d',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};
