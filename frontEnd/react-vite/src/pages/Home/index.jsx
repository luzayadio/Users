import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])
  const inputNameRef = useRef()
  const inputEmailRef = useRef()
  const inputBirthdateRef = useRef()

  async function getUsers() {
    await api.get('/users')
      .then((response) => {
        console.log(response.data)
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('Erro ao obter usuários:', error)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  async function createUser() {
    const name = inputNameRef.current.value
    const email = inputEmailRef.current.value
    const birthdate = inputBirthdateRef.current.value

    if(!name || !email || !birthdate) {
      alert('Preencha todos os campos!')
      return
    }

    await api.post('/users', { name, email, birthdate })
      .then((response) => {
        console.log(response.data)
        getUsers()
        alert('Usuário criado com sucesso!')
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error)
        alert('Erro ao criar usuário!')
      })
  }

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input name='name' type="text" placeholder='Digite seu nome' ref={inputNameRef} />
        <input name='email' type="email" placeholder='Digite seu email' ref={inputEmailRef} />
        <input name='birthdate' type="date" placeholder='Digite sua data de nascimento' ref={inputBirthdateRef} />
        <button onClick={createUser} type='button'>Cadastrar</button>
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
