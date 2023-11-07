import React, { PureComponent } from 'react';

import { Api, Websocket } from 'cosmoport-core-api-client';
import Time from './components/Time';
import CalendarDate from './components/CalendarDate';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';
import Guid from './class/Guid';

import './App.css';

// Design
require('../../assets/resources/v1/async.app');
require('../../assets/resources/v1/defer.app');

const errorMessage = (error) =>
  // eslint-disable-next-line no-console
  console.error(`Error #${error.code || '000'}: ${error.message}`, 'error');

const defaultLocale = {
  code: 'xx',
  default: true,
  id: 0,
  localeDescription: '',
  show: true,
  showTime: 1,
};

export default class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      api: null,
      socket: null,
      number: 1,
      count: 20,
      events: [],
      refData: {},
      locales: [],
      nextLocaleIndex: -1,
      i18n: {},
    };

    this.init(props.conf);
    props.handlers.onScreenSelect = this.handleScreenSelect;
  }

  init = (config) => {
    const self = this;
    const address = `ws://${
      config.address.ws
    }/events?id=timetable&guid=${Guid.get()}`;

    const socket0 = new Websocket({
      url: address,

      onopen() {},

      onmessage(...args) {
        const message = args[0].data;
        console.info(message);

        if (message === ':reload') {
          self.getData(() => ({}));
        }

        if (message === ':timeout_update') {
          clearTimeout(self.timerID);
          self.getData(() => self.refreshLocaleLoop());
        }

        if (message === ':sync_timetables') {
          self.setState({ nextLocaleIndex: -1 }, () => {
            self.refreshLocaleLoop();
          });
        }
      },

      onclose() {
        if (self.state.socket) {
          self.state.socket.close();
        }
      },

      onerror(...args) {
        console.error(args);
      },
    });

    this.state.api = new Api(`http://${config.address.server}`);
    this.state.socket = socket0;
    this.state.api
      .fetchTime()
      .then((data) => this.setState({ timestamp: data.timestamp }))
      .catch();

    this.getData(() => this.refreshLocaleLoop());
  };

  componentWillUnmount() {
    const { socket } = this.state;
    clearTimeout(this.timerID);
    if (socket) socket.close();
  }

  getCurrentLocale = () => {
    const { locales, nextLocaleIndex } = this.state;

    return locales.length > 0 && nextLocaleIndex > -1
      ? locales[nextLocaleIndex % locales.length]
      : defaultLocale;
  };

  getLocale = () => {
    const { i18n, locales } = this.state;
    if (Object.is(i18n, {}) || locales.length < 1) {
      return '';
    }
    const locale = this.getCurrentLocale();
    return i18n[locale.code];
  };

  findSetting = (settings, key) =>
    (settings.find && settings.find((setting) => setting.param === key)) || {
      value: undefined,
    };

  getData = (callback) => {
    const { api } = this.state;

    Promise.all([
      api.fetchReferenceData(),
      api.fetchTranslations(),
      api.fetchVisibleLocales(),
      api.fetchSettings(),
    ])
      .then((data) => {
        this.setState({
          refData: data[0],
          i18n: data[1],
          locales: data[2],
          settings: data[3],
        });

        return data[3];
      })
      .then((settings) => {
        const lines =
          this.findSetting(settings, 'timetable_screen_lines').value || 20;
        this.setState({ count: lines });

        return api.fetchEventsPage(this.state.number, lines);
      })
      .then((events) => this.setState({ events }))
      .then(() => callback())
      .catch((error) => errorMessage(error));
  };

  refreshLocaleLoop = () => {
    clearTimeout(this.timerID);
    this.timerID = setTimeout(
      () => this.tick(),
      this.getCurrentLocale().showTime * 1000,
    );
  };

  tick = () => {
    const { nextLocaleIndex, locales } = this.state;

    this.setState(
      { nextLocaleIndex: (nextLocaleIndex + 1) % locales.length },
      () => {
        this.refreshLocaleLoop();
      },
    );
  };

  handleScreenSelect = (screen) => {
    const { api, count } = this.state;
    api
      .fetchEventsPage(screen, count)
      .then((data) => this.setState({ number: screen, events: data }))
      .catch((error) => errorMessage(error));
  };

  render() {
    const { i18n, events, number, refData } = this.state;

    if (Object.is(i18n, {})) {
      return <div>There are no translation data.</div>;
    }

    if (events.length < 1) {
      return <div>There are no event data.</div>;
    }

    const nextLocale = this.getLocale();
    if (nextLocale === undefined || nextLocale === defaultLocale) {
      return <div>Loading...</div>;
    }

    return (
      <div className="g-section__content">
        <div className="header">
          <div className="header__number">{number}</div>
          <div className="header__logo">
            <i className="i-logo header__logo-icon" />
          </div>
          <div className="header__info">
            <Time />
            <CalendarDate locale={nextLocale} />
          </div>
        </div>

        <TableHeader locale={nextLocale} refs={refData} />
        {events.map((event) => (
          <TableRow
            key={event.id}
            event={event}
            locale={nextLocale}
            refs={refData}
          />
        ))}
      </div>
    );
  }
}
