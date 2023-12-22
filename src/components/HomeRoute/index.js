import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Loader} from 'react-loader-spinner'

import HeaderRoute from '../HeaderRoute'
import ReactSlickRoute from '../ReactSlickRoute'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    postApiUserList: [],
    isLikeActive: false,
    apiStatus: apiStatusConstants[0].initial,
  }

  componentDidMount() {
    this.getPostApiUsers()
  }

  getPostApiUsers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {postApiUserList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const postsAPIURL = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(postsAPIURL, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const postUpdateData = data.posts.map(item => ({
        postId: item.post_id,
        createdAt: item.created_at,
        likesCount: item.likes_count,
        postDetails: item.post_details,
        profilePic: item.profile_pic,
        userId: item.user_id,
        userName: item.user_name,
        comments: item.comments,
      }))
      this.setState({apiStatus: apiStatusConstants.success})

      this.setState({postApiUserList: postUpdateData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  /* renderUserPosts = () => {
    const {postApiUserList} = this.state

    return (
      <ul className="ul-post-container">
        {postApiUserList.map(item => (
          <li key={item.postId} className="post-list-item">
            <div className="profile-container">
              <img
                src={item.profilePic}
                alt="username"
                className="profile-icon"
              />
              <span className="profile-user-name">{item.userName}</span>
            </div>
            <img
              src={item.postDetails.image_url}
              alt={item.postDetails.caption}
              className="post-image-url"
            />
            <FcLike className="like-icon" />
            <FaRegComment className="like-icon" />
            <BiShareAlt className="like-icon" />
            <p className="comments-description">{item.likesCount} likes</p>
            <p className="comments-description">{item.postDetails.caption}</p>
            <div>
              {item.comments.map(com => (
                <p className="comments">
                  <span className="username-comment">{com.user_name}</span>{' '}
                  {com.comment}
                </p>
              ))}
            </div>
            <p className="comments-description">{item.createdAt}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dqyqjbuku/image/upload/v1671173988/somethingWentWrong2_vurmd9.png"
        alt="failure view"
      />
      <p>Something went Wrong. Please try again</p>
    </div>
  )

  getUserPosts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserPosts
      case apiStatusConstants.failure:
        return this.renderFailureView
      case apiStatusConstants.inProgress:
        return this.renderLoadingView

      default:
        return null
    }
  } */

  render() {
    const {postApiUserList} = this.state
    console.log(postApiUserList)
    return (
      <>
        <HeaderRoute />
        <div className="container">
          <ReactSlickRoute />
        </div>
      </>
    )
  }
}

export default HomeRoute
