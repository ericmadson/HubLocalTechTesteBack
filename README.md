# HubLocalTechTestBack

Back end do teste técnico realizado para a empresa HubLocal. Essa aplicação se trata
do lado back end da aplicação completa, para visualização completa, acessar em conjunto
com o lado [Front End](https://github.com/ericmadson/HubLocalTechTestFront) 

### Pré-Requisitos

- [Front End](https://github.com/ericmadson/HubLocalTechTestFront)
- NodeJS => v16.13.0
- NPM => v8.1.0
- Yarn => 1.22.11

### Instalação

Clone o repositório

    git clone https://github.com/ericmadson/HubLocalTechTestBack.git

Navegue até o repositório

    cd HubLocalTechTestBack

Instale as dependências

    npm install

Inicie a aplicação

    npm run start

## Detalhes

Essa aplicação foi criada segundo os parâmetros definidos pela empresa HubLocal,
seguindo a proposta de:
- Logar/Criar usuários
- Criar/Listar/Deletar/Editar empresas (usuário logado)
- Criar/Listar/Deletar/Editar locais pertencentes a uma
empresa (usuário logado)

## Observações

Ao realizar a deleção, pode acontecer algum erro por causa da entidade possuir outra relacionada.
Ex: Erro ao excluir uma empresa, pois a mesma possui locais cadastrados a ela.

## Techs

Tecnologias utilizadas:
- NodeJS
- NestJS
- Prisma
- SQLite 3




