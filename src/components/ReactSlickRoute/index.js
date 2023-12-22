import {Component} from 'react'

import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Loader} from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlickRoute extends Component {
  state = {
    userStoriesList: [],
    // apiStatus: apiStatusConstants[0].initial,
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    // this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const userStoriesAPI = `https://apis.ccbp.in/insta-share/stories`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(userStoriesAPI, options)
    const data = await response.json()
    console.log(data)
    const newData = data.users_stories.map(item => ({
      userId: item.user_id,
      username: item.user_name,
      storyUrl: item.story_url,
    }))
    if (response.ok === true) {
      this.setState({userStoriesList: newData})
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessUserStories = () => {
    const {userStoriesList} = this.state
    console.log(userStoriesList)

    return (
      <Slider {...settings} className="slick-container">
        {userStoriesList.map(eachLogo => {
          const {userId, storyUrl, username} = eachLogo
          return (
            <div className="slick-item" key={userId}>
              <img className="logo-image" src={storyUrl} alt="company logo" />
              <p className="username">{username}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderSliderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dqyqjbuku/image/upload/v1672135428/alert-triangle_tvr84c.png"
        alt="failure view"
      />
      <p>Something Went Wrong. Please try again</p>
      <button type="button" onClick={this.onClickTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        type="TailSpin"
        color="#0b69ff"
        height="50"
        width="50"
        className="oval-icon"
      />
    </div>
  )

  renderUserPosts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserPostView()
      case apiStatusConstants.failure:
        return this.renderSliderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {userStoriesList} = this.state
    console.log(userStoriesList)

    return (
      <Slider {...settings} className="slick-container">
        {userStoriesList.map(eachLogo => {
          const {userId, storyUrl, username} = eachLogo
          return (
            <div className="slick-item" key={userId}>
              <img className="logo-image" src={storyUrl} alt="company logo" />
              <p className="username">{username}</p>
            </div>
          )
        })}
      </Slider>
    )
  }
}

export default ReactSlickRoute
