import HeaderJpg from './pic/Header.jpg'

const Header = () => {

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <img src={HeaderJpg} alt='Integrations' width={1440} style={{ width: '100%', minWidth: '500px', height: 'auto' }} />
    </div>
  )
}

export default Header