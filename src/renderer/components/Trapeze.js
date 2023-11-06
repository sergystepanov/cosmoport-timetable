export default function Trapeze({ position = '' }) {
  return (
    <div className={`trapeze ${position}`}>
      <svg
        className='trapeze__triangle _first'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 12 15'
        width='12'
        height='15'>
        <path fill='var(--border, white)' d='M12 3V-.003L.005 15.004 0 15h3z' />
        <path fill='var(--bg, rgba(0,204,255,.5))' d='M12 3v12H3z' />
      </svg>
      <div className='trapeze__main'></div>
      <svg
        className='trapeze__triangle _last'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 12 15'
        width='12'
        height='15'>
        <path fill='var(--border, white)' d='M12 3V-.003L.005 15.004 0 15h3z' />
        <path fill='var(--bg, rgba(0,204,255,.5))' d='M12 3v12H3z' />
      </svg>
    </div>
  );
}
