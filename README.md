# Car Store - REST API Documentation

O intuito dessa aplicação foi gerar uma REST API que simulasse um _back-end_ de uma loja virtual de venda de carros. Este serviço é uma aplicação robusta que utiliza várias tecnologias para oferecer funcionalidades poderosas e escaláveis. Abaixo estão as principais tecnologias utilizadas neste projeto:

## Tecnologias Utilizadas:

**1. Express**

O Express é um framework para Node.js que fornece um conjunto robusto de recursos para aplicativos web e API. Ele simplifica o processo de criação de aplicativos, oferecendo uma abordagem minimalista e flexível para o desenvolvimento.

**2. TypeORM**

O TypeORM é um ORM (Object-Relational Mapping) para TypeScript e JavaScript. Ele permite interagir com bancos de dados relacionais de forma orientada a objetos, simplificando operações de banco de dados complexas e proporcionando uma experiência de desenvolvimento eficiente.

**3. BcryptJS**

BcryptJS é uma biblioteca para criptografia de senhas. Ele ajuda a proteger informações sensíveis, como senhas de usuários, utilizando algoritmos de hash seguros para armazenamento seguro e autenticação.

**4. JSON Web Token (JWT)**

JSON Web Tokens são utilizados para autenticação e informações seguras de troca entre partes. Eles são especialmente úteis para proteger rotas e recursos em aplicações web, garantindo a integridade dos dados transmitidos.

**5. PostgreSQL (pg)**

PostgreSQL é um sistema de gerenciamento de banco de dados relacional de código aberto e poderoso. É altamente escalável e oferece suporte a transações ACID (Atomicity, Consistency, Isolation, Durability), tornando-o uma escolha popular para aplicativos robustos e de alta performance.

**6. Dotenv**

Dotenv é uma biblioteca que permite carregar variáveis de ambiente de arquivos .env. É especialmente útil para configurar informações sensíveis, como chaves de API, sem expô-las no código-fonte, melhorando assim a segurança do aplicativo.

**7. Zod**

Zod é uma biblioteca de validação de dados altamente eficiente e fácil de usar para JavaScript e TypeScript. Ela ajuda a garantir que os dados recebidos pelo aplicativo estejam no formato correto, proporcionando maior confiabilidade e segurança.

## Instalação:

1.  Antes de executar o serviço de back-end, certifique-se de ter o
    Node.js instalado em seu sistema. Em seguida, instale as
    dependências necessárias usando o seguinte comando:

        npm install

    Este comando instalará todas as dependências listadas no arquivo
    package.json, incluindo Express, TypeORM, BcryptJS, JSON Web Token,
    PostgreSQL, Dotenv e Zod. Após a conclusão da instalação, o serviço
    estará pronto para ser executado.
    <br>

2.  Antes de inicializar o servidor, acesse o arquivo .env.example
    dentro do projeto e preencha com as devidas configurações para
    conectar com o seu banco de dados PostgreSQL

> env.example

    DATABASE_URL=postgres://<user_name>:<user_password>@localhost:<port>/<database_name>
    SECRET_KEY=<your_secret_key>
    EXPIRES_IN=3h
    PORT=3000

3. Feito tudo isso, podemos iniciar a aplicação:
   `npm run dev`
