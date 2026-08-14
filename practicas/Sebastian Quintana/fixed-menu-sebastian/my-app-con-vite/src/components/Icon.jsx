import React from 'react';

// Iconos SVG en línea (sin dependencias externas).
const PATHS = {
  home: 'M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5',
  gamepad: 'M6 12h4m-2-2v4M15 11h.01M17.5 13.5h.01M7 7h10a5 5 0 0 1 5 5v1a4 4 0 0 1-7.2 2.4l-.4-.5h-4.8l-.4.5A4 4 0 0 1 2 13v-1a5 5 0 0 1 5-5Z',
  users: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm13 9v-1a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 19 7a4 4 0 0 1-3 3.87',
  layers: 'M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13h.01M11 12h1v5h1',
  shield: 'M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Zm-2.5 9 2 2 3.5-4',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a8 8 0 0 0-2-1.2l-.3-2.5h-4l-.4 2.5a8 8 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5A8 8 0 0 0 4 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 2 1.2l.4 2.5h4l.3-2.5a8 8 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z',
  login: 'M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3',
  logout: 'M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3M16 17l5-5-5-5M21 12H9',
  userPlus: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19 8v6M22 11h-6',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm10 3-5.2-5.2',
  refresh: 'M21 12a9 9 0 1 1-3.2-6.9M21 3v5h-5',
  mail: 'M3 7l9 6 9-6M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z',
  chat: 'M21 12a8 8 0 0 1-8 8H8l-5 3 1.4-4.2A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z',
  discord: 'M8 12h.01M16 12h.01M7 18s-3-5-2-11c2-1 4-1.5 4-1.5L10 7h4l1-1.5s2 .5 4 1.5c1 6-2 11-2 11l-3-2H10l-3 2Z',
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0V4Zm0 1H5v2a3 3 0 0 0 3 3m8-5h3v2a3 3 0 0 1-3 3m-4 4v4m-3 3h6',
  rocket: 'M12 3c3.5 2 5.5 5.5 5.5 9.5L12 18l-5.5-5.5C6.5 8.5 8.5 5 12 3Zm0 5.5h.01M9 18l-2 3M15 18l2 3',
  cloud: 'M7 18h10a3.5 3.5 0 0 0 .5-7A5.5 5.5 0 0 0 7 10.5 3.75 3.75 0 0 0 7 18Z',
  code: 'M9 8l-4 4 4 4m6-8 4 4-4 4',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3.5 2',
  check: 'M4 12.5 9 17.5 20 6.5',
  trash: 'M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13',
  arrowUp: 'M12 19V5m0 0-6 6m6-6 6 6',
  key: 'M15 8h.01M21 3l-3 3m-1.5 1.5a5 5 0 1 1-7 7l-1 1H7v2H5v2H3v-3l6.5-6.5a5 5 0 0 1 7-2.5Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  link: 'M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1m-1 8a5 5 0 0 1-7 0 5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 0',
  alert: 'M12 9v4m0 3h.01M10.3 4.3 2.6 17.5A1.5 1.5 0 0 0 3.9 20h16.2a1.5 1.5 0 0 0 1.3-2.5L13.7 4.3a1.5 1.5 0 0 0-2.6 0Z',
  wrench: 'M15 3a5 5 0 0 0-4 8l-7 7 2 2 7-7a5 5 0 0 0 6-6l-3 3-2.5-2.5 3-3A5 5 0 0 0 15 3Z',
  database: 'M12 8c4.4 0 8-1.1 8-2.5S16.4 3 12 3 4 4.1 4 5.5 7.6 8 12 8Zm8-2.5v13c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5v-13M20 12c0 1.4-3.6 2.5-8 2.5S4 13.4 4 12',
};

function Icon({ name, size = 18, strokeWidth = 1.8, className = '', ...rest }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d={path} />
    </svg>
  );
}

export default Icon;
