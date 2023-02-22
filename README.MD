# Django-Rest + Vue.js
- Projeto básico de criação de usuários e login via Google ou username criado

## Backend

### Instalação necessário Python 3.10
```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### API
[http://localhost:8000/api/swagger/]


## Frontend 
### Instalação versão Node:17.9.0

```
cd frontend
npm install
npm run dev
```

#### Pagina inicial
[http://localhost:3000/login]

### Google criar credencial para projeto e pegando seu id client 

#### URL javascripts autorizadas (frontend): 
[http://127.0.0.1:3000]
[http://localhost:3000]

#### Redirecionamento para:
[http://127.0.0.1:8000/accounts/google/login/callback/]

- Na pasta do frontend, renomear o .env.sample para .env e informar variaveis de ambiente
