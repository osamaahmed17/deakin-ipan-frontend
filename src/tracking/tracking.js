import API from 'helpers/api.js'

export const E = {
  T_VISIT_URL: 'T_VISIT_URL',
  T_UI_CLICK: 'T_UI_CLICK',
  T_UI_SCROLL: 'T_UI_SCROLL',
  T_LOGIN: 'T_LOGIN',
  T_LOGOUT: 'T_LOGOUT',
}
//TODO: Save data in redux state instead. Escape data as well
var trackData = []
var postData = {}
var dispatchFlag = false
var trackerId

function appendTrackingData(data) {
  var obj = {
    url: data.url,
    time: new Date().toISOString(),
    event: data.event,
  }

  if (data.misc) obj.misc = data.misc

  //TODO: If the event is login or logout, add the userID to the data as well
  trackData.push(obj)

  var postObj = { data: trackData }
  if (trackerId) postObj.trackerId = trackerId

  postData = JSON.stringify(postObj)
  
  postData = { data: postData }
}

function dispatch(cb) {
  // EXPERIMENTAL PROPOSAL
  // if dispatch running, set dispatchFlag
  // upon callback, set dispatchFlag false
  if (trackData.length === 0) return cb()
  dispatchFlag = true

  API.postTrackingData(postData, (err, data) => {
    dispatchFlag = false

    if (err) return cb(err)

    if (data) trackerId = data.trackerId

    trackData = []
    cb()

  })

}

// how to make sure that handleBrowserExit waits for any dispatch() executions going on to finish?
// EXPERIMENTAL PROPOSAL
// if dispatchFlag === true, wait for it to become false?

function handleBrowserExit(event) {
  // Source: https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload#Example
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = undefined

  if (dispatchFlag) {
    console.log('Waiting to save information..')
    while (dispatchFlag) { }
  }

  dispatch((err) => {
    if (err) console.error(err)

    console.log('Information saved!')
    
  })

  // TODO: Fix a bug where chrome prompts you if you want to leave the page
  return undefined
}

function initDispatchTimer() {
  setInterval(dispatch, 10000, (err) => {
    if (err) console.error(err)

    console.log('Information saved!')
  })
}

initDispatchTimer()

// window.addEventListener("beforeunload", handleBrowserExit)

export default appendTrackingData
