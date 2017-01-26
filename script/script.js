"use strict";

// Application afterload
window.onload = () => {
	console.log('[app] started');

	// Load data from the server
	let timestamp = new Date();

	const clock = new Clock(timestamp);
	clock.start();
	const date = new CurrentDate(timestamp);

	const timetable = new Timetable();
	timetable._getRemoteData();

	var socket = new window.SocketWrapper({
  url: 'ws://127.0.0.1:8080/events',
  onopen: function() {
    this.send('message', 'hi');
  },
  onmessage: function() {
    console.log(arguments);
  },
  onclose: function() {
    socket = null;
  },
  onerror: function() {
    console.log('error occured, oh no!');
    console.error(arguments);
  }
});
socket.send('i am message send to soon, but since i check the state of the ws object, i will be queued and send when appropriate');

}

	// Init server connection
(function(nameSpace) {
  function createMethod(method, options, stateCallback) {
    var that = this;
    this[method] = function() {
      if (stateCallback && stateCallback.apply) {
        stateCallback(method);
      }
      console.info(method);
      if (options[method] && options[method].apply) {
        options[method].apply(that, arguments);
      }
    };
  }

  function SocketWrapper(options) {
    var ws,
      events = ['onopen', 'onmessage', 'onclose', 'onerror'],
      i, len, prop = {
        opened: false,
        closed: false,
        error: false
      },
      method;

    if (typeof options === 'undefined' || !options) {
      throw 'ArgumentException: please add default constructor options';
    }

    this.queue = [];

    this.onEventTrigger = function(eventName) {
      var i, len;
      if (eventName === 'onopen') {
        prop.opened = true;
        prop.closed = false;
        // openend send queue
        if (this.queue.length > 0) {
          for (i = this.queue.length; --i >= 0;) {
            this.send.apply(this, this.queue[0]);
            this.queue.splice(0, 1);
          }
        }
      }
      if (eventName === 'onerror') {
        prop.error = true;
      }
      if (eventName === 'onclosed') {
        prop.opened = false;
        prop.closed = true;
      }
    };

    this.init = function() {
      var cb = this.onEventTrigger.bind(this);
      ws = new WebSocket(options.url);

      for (i = 0; i < events.length; i++) {
        method = events[i];
        createMethod.apply(ws, [method, options, cb]);
      }
    };

    this.send = function() {
      if (prop.closed) {
        throw 'InvalidOperation: Cannot send messages to a closed Websocket!';
      }
      if (!prop.opened) {
        this.queue.push(arguments);
      } else {
        ws.send.apply(ws, arguments);
      }
    };

    this.init();
    return this;
  }

  window.SocketWrapper = SocketWrapper;
}(window));

// Clock
class Clock {
	constructor(timestamp) {
		this.timestamp = timestamp;
		this.clockEl = document.getElementById('clock-value');
		this._render();
	}

	getTime() {
		return this.timestamp;
	}

	tick() {
		if (this.timestamp !== undefined) {
			this.timestamp.setSeconds(this.timestamp.getSeconds() + 1);
			this._render();
		}
	}

	start() {
		var me = this;

		setInterval(function() {me.tick()}, 1000);
	}

	_render() {
		this.clockEl.innerHTML = `${this.timestamp.getHours()}:${this._format00(this.timestamp.getMinutes())}`;
	}

	_format00(value) {
		return value < 10 ? value = `0${value}` : value;
	}
};

// Date
class CurrentDate {
	constructor(timestamp) {
		this.dayEl = document.getElementById('month-day');
		this.monthEl = document.getElementById('month-name');
		this.yearEl = document.getElementById('year');

		this.monthNames = {ru: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сеп", "Окт", "Нов", "Дек"]};
		this.timestamp = timestamp;

		this._render();
	}

	_render() {
		this.dayEl.innerHTML = this.timestamp.getDate();
		this.monthEl.innerHTML = this.monthNames.ru[this.timestamp.getMonth()];
		this.yearEl.innerHTML = this.timestamp.getFullYear();
	}
}

// Timetable
class Timetable {
	constructor() {
		this.data = [];
		this.dataEl = document.getElementById('data');
	}

	_getRemoteData() {
		var me = this;

		fetch('http://127.0.0.1:8080/test', {mode: 'cors'})
  			.then(function(response) {
				return response.json();
   			})
			.then(function(data) {
				me.data = data;
				me._render();
			})
  			.catch();
	}

	_render() {
		var _rendered = '';
		for (let item of this.data) {
			console.log(item);

			_rendered += `<div class="row ${item.status === 'inactive' ? 'canceled' : ''}">
					<div class="fake-left"></div>
					<div class="tr">
						<div class="pure-u-1-6">${item.departureTime}</div>
						<div class="pure-u-1-5"><span class="type-name">${item.type}</span>${item.type}</div>
						<div class="pure-u-1-6">${item.destination}</div>
						<div class="pure-u-1-8">${item.cost} €</div>
						<div class="pure-u-1-6">${item.duration} мин</div>
						<div class="pure-u-1-6">${item.status}</div>
					</div>
					<div class="fake-right"></div>
				</div>`;
		}

		this.dataEl.innerHTML += _rendered;

		return _rendered;
	}
}
