function humanizeEventType(str) {
	return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(x) {
    return x[0].toUpperCase() + x.substr(1).toLowerCase();
	}).join(' ')
}

function notificationText(item) {
  if (item.data.text) {
    return item.data.text;
  } else if (item.data.card) {
    return item.data.card.name;
  } else if (item.data.board) {
    return item.data.board.name;
  } else {
    return '';
  }
}

function notificationUrl(item) {
  if (item.data.card) {
    return 'https://trello.com/c/' + item.data.card.shortLink;
  } else if (item.data.board) {
		return 'https://trello.com/b/' + item.data.board.shortLink;
  } else {
    return '';
  }
}

fetch('https://trello.com/1/Members/me?notifications=all&notifications_limit=10')
.then(res => res.json())
.then(json => {
  let notifications = json.notifications.map(item => {
    return {
			title: humanizeEventType(item.type),
			message: notificationText(item),
			iconUrl: 'https://trello.com/favicon.ico',
			url: notificationUrl(item)
    }
  })
  commit(notifications)
})
