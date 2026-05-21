import './style.css'
import Trash from '../../assets/trash.svg'

function Home() {

  const users = [
    {
      name: 'Luzayadio Vila',
      email: 'lbenivila@gmail.com',
      birthdate: '1990-01-01',
    },
    {
      name: 'Joana Vila',
      email: 'lbenivila@gmail.com',
      birthdate: '1990-01-01',
    }
  ]

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input name='name' type="text" placeholder='Digite seu nome' />
        <input name='email' type="email" placeholder='Digite seu email' />
        <input name='birthdate' type="date" placeholder='Digite sua data de nascimento' />
        <button type='button'>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Data de nascimento: {user.birthdate}</p>
          </div>
          <button type='button'>
            <img src={Trash} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
