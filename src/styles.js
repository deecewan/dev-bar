export default {
  toolbar: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#FFF',
    marginRight: '22px',
  },

  before: {
    width: 0,
    height: 0,
    position: 'absolute',
    left: '-22px',
    borderTop: '11px solid rgba(0,0,0,0.7)',
    borderLeft: '11px solid transparent',
    borderRight: '11px solid rgba(0,0,0,0.7)',
    borderBottom: '11px solid transparent',
  },

  after: {
    width: 0,
    height: 0,
    top: 0,
    right: '-22px',
    position: 'absolute',
    borderTop: '11px solid transparent',
    borderLeft: '11px solid rgba(0,0,0,0.7)',
    borderRight: '11px solid transparent',
    borderBottom: '11px solid rgba(0,0,0,0.7)',
  },

  piece: {
    display: 'inline-block',
    padding: '3px 5px',
    fontSize: '0.9rem',
    fontFamily: 'sans-serif',
    borderRight: '1px solid white',
  },

  lastPiece: {
    border: 'none',
  },

  key: {
    fontWeight: 400,
  },

  value: {
    fontWeight: 'light',
  },
};
