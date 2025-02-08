import { useSelector } from 'react-redux';
function Channel() {
  const user = useSelector(state => state.user.user);

  const handleClick = async() => {
    try {
      const channel = await postChannel(channelName, user.username, description, channelBanner, subscribers, video);
      console.log(channel);
    } catch (error) {
      setError('Failed to create user.');
    }
  };

  return(<>
       console.log("Hello");

  </>);
}

export default Channel;
