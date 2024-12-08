import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SearchAndFollow from '../components/SearchAndFollow'
import Posts from '../components/Posts'
import { FaSmile, FaFileImage } from 'react-icons/fa'
import Picker from "emoji-picker-react"
import { useDispatch, useSelector } from 'react-redux'
import { addPost, getAllPosts } from './features/postSlice'
import axios from 'axios'


const Home = () => {
  
  const [text, setText] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [media, setMedia] = useState('')
  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessaage, setErrorMessaage] = useState(false)

  const dispatch = useDispatch()
  const {logedInUser, users} = useSelector((state) => state.users)
  const {posts, status} = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getAllPosts())
  },[])

  const onEmojiClick = (event, emojiObject) => {
    setText((pre) => pre + event.emoji)
  };

  console.log("Home is loading")


  const handlePost = () => {
    if (!logedInUser.fullName || !logedInUser.userName || !text || !logedInUser.userImage ) {
      console.log("Provide all the required values to send post data.");
      setErrorMessaage(true)
      return;
    }else{
      setErrorMessaage(false)
    }

    const newPost = {
      fullName: logedInUser.fullName,
      userName: logedInUser.userName,
      postText: text,
      userImage: logedInUser.userImage,
      postMedia: media,
    };
    dispatch(addPost(newPost));
    
    setText('');
    setMedia(null);
    setFileName(null); 
  }

  const handelAddImage = async (e) => {
    const files = e.target.files;
    const fileType = files[0].type;
    setFileName(files[0].name);

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'social_circle');

    setIsUploading(true); 

    try {
      let response;
      if (fileType.includes('image')) {
        response = await axios.post("https://api.cloudinary.com/v1_1/dzykh1rzh/image/upload", data);
      } else if (fileType.includes('video')) {
        response = await axios.post("https://api.cloudinary.com/v1_1/dzykh1rzh/video/upload", data);
      } else {
        console.log("File type is not supported");
        setIsUploading(false);
        return;
      }

      if (response && response.data && response.data.secure_url) {
        setMedia(response.data.secure_url);
      }

    } catch (err) {
      console.log('Error uploading to Cloudinary:', err.response?.data || err.message);
    } finally {
      setIsUploading(false); 
    }
  }
  

  return (
    <>
      <Header/>
      <main className='container py-4 mb-5'>
        <div className='row'>
            <div className='col-md-2' style={{marginTop : '40px', position : 'fixed'}}>
                <Sidebar user={logedInUser}/>
            </div>
            <div className='col-md-7' style={{marginTop : '50px', marginLeft : '16vw'}}>
                <div className='row'>
                    <div className='col-md-2'>
                      <img src={logedInUser.userImage} alt='avtImage'
                      className='img-fluid rounded-circle w-75' />
                    </div>
                    <div className='col-md-10'>
                        <textarea
                        rows={5} 
                        className='bg-secondary-subtle border-0 px-2 w-100'
                        placeholder='Write somethig interesting...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{fontFamily : "Courier New"}}
                        ></textarea>
                        <div className='d-flex justify-content-between mt-2'>
                            <div>
                              <label htmlFor='img'>
                                <FaFileImage title='Add image/video'/>                              
                              </label>                               
                              <input 
                                type="file" 
                                id="img" 
                                name="img" 
                                // accept="image/*" 
                                style={{"display" : "none"}} 
                                onChange={(e) => handelAddImage(e)}
                              />
                              <label htmlFor='emoji'>
                                <FaSmile title='Add Emoji' className='mx-3' onClick={() => setShowPicker(!showPicker)}/>                              
                              </label>
                              {showPicker && (
                                <div style={{ position: 'absolute', zIndex: 1 }}>
                                  <Picker onEmojiClick={onEmojiClick} />
                                </div>
                              )}                             

                            </div>
                            <div className=''>
                              <button className='btn btn-danger text-white rounded' onClick={handlePost}>{isUploading ? 'Uploading...' : 'Post'}</button>
                            </div>
                        </div>
                        {fileName && <span> {fileName}</span>}
                        {errorMessaage && <p className='text-danger'>Please write something to make a post.</p>}
                    </div>
                </div>
                {/* Post section */}
                <div className=''>
                  <h4 className='mb-3'>Latest Posts</h4>
                  {status === 'success' ? <Posts posts={posts}/> : <p>Loading...</p>}                  
                </div>
            </div>
            <div className='col-md-3' style={{marginTop : '50px', position : 'fixed', marginLeft : '66vw'}}>
              <SearchAndFollow users={users} />            
            </div>
        </div>
      </main>
    </>
  )
}

export default Home


