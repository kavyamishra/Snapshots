import './App.css';
import axios from "axios";
import { useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [param, setParam] = useState("");
  const [hoveredImageUrl, setHoveredImageUrl] = useState("");

  const options = {
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
    params: {
      q: param,
      pageSize: '50',

    },
    headers: {
      'X-RapidAPI-Key': '26ce35ec0emsh3bcf5a81ef9bcf6p17431cjsn048a9d5d7ff4',
      'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  };

  const searchImages = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.request(options);
      setImages(response.data.value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageHover = (imageUrl) => {
    setHoveredImageUrl(imageUrl);
  };

  const resetBackground = () => {
    setHoveredImageUrl("");
  };

  const appStyle = {
    backgroundImage: `url(${hoveredImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return (
    <div className="App" style={appStyle} onMouseLeave={resetBackground}>
      <h1>SnapShots</h1>
      <form onSubmit={searchImages}>
        <input type="text" name="param" id="param" onChange={(e) => setParam(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div className="images">
        {images.map((image, index) => (
          <div
            key={index}
            className='flexAlign'
            onMouseEnter={() => handleImageHover(image.url)}
          >
            <img src={image.url} alt="" className='img' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
