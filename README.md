# cs-desafio-node
api rest de login com jsonwebtoken e criação de usuário 


# Singin :
link: http://desafionode.azurewebsites.net/api/singin
metodo: post
envia json com email e senha e retorna o usuario com token gerado valido por 30 minutos

# Singup:
link: http://desafionode.azurewebsites.net/api/singup
metodo: post
envia json com o usuario para persistir e retorna o usuario criado com token valido por 30 minutos

# serachuser: 
1 - http://desafionode.azurewebsites.net/api/seachUser/:id
metodo: get

enviar o id pela url com token gerado no login e adicionar o token na header['bearer']
sera retornado um usuario com suas informacoes.



# Rodando a aplicação localmente
Clonar o repositorio e usar "npm install" no terminal para baixar as dependências
apos baixar todas as dependências, inicie a aplicação com o comando "gulp"
