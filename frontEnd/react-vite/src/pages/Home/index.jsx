import { useEffect } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {

  let users = []

  async function getUsers() {
    await api.get('/users')
      .then((response) => {
        console.log(response.data)
        users = response.data
      })
      .catch((error) => {
        console.error('Erro ao obter usuários:', error)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

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
            <p>Nome: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Data de nascimento: <span>{user.birthdate}</span></p>
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
