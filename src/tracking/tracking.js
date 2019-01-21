export const E = {
  T_VISIT_URL:    'T_VISIT_URL',
  T_UI_CLICK:     'T_UI_CLICK',
  T_UI_SCROLL:    'T_UI_SCROLL',
  T_LOGIN:        'T_LOGIN',
  T_LOGOUT:       'T_LOGOUT',
}

var trackData = []

function appendTrackingData(data) {
  var obj = {
    url: data.url,
    time: new Date().toISOString(),
    event: data.event,
  }

  if (data.misc) obj.misc= data.misc

  console.log(obj)
  trackData.push(obj)
}

export default appendTrackingData
