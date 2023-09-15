
import axios from "axios";

export   const fetchGallery = async (page,name) => {
   
     const resp = await axios.get(`https://pixabay.com/api/?q=${name}&page=${page}&key=33447079-0ba3d1fd30cda0252aa7b7ada&image_type=photo&orientation=horizontal&per_page=12`);
     return resp.data

    
}
    export default { fetchGallery };

