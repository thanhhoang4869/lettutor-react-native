import axios from 'axios';

const noAvatar: string =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.seekpng.com%2Fipng%2Fu2e6y3e6q8r5q8a9_no-avatar-user-circle-icon-png%2F&psig=AOvVaw0O3H1Aie89pVc2fmeiyZWg&ust=1682315182162000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOin0Mimv_4CFQAAAAAdAAAAABAI';

async function checkAndReturnImage(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {responseType: 'arraybuffer'});
    const contentType = response.headers['content-type'];

    if (contentType.startsWith('image/') && response.status === 200) {
      return url;
    } else {
      return noAvatar;
    }
  } catch (error) {
    return noAvatar;
  }
}

const imageUtils = {
  checkAndReturnImage,
};

export default imageUtils;
