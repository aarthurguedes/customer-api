# customer-api

## Descrição

API de clientes, com suporte às seguintes operações:

- Salvar um novo cliente;
- Atualizar um cliente;
- Recuperar um cliente por ID;

## Como executar o projeto localmente:

1. Primeiro, precisamos criar um arquivo (`.env`) para carregar nossas variáveis de ambiente. Você pode usar o seguinte comando para copiar as variáveis do `.env.example`:

```
cp .env.example .env
```

2. Agora, basta criarmos e iniciarmos os _containers docker_. Para isso, podemos executar o seguinte comando:

```
docker-compose up
```

3. Pronto! Caso você não tenha alterado o valor da variável `API_PORT`, no `.env`, o projeto já deve estar disponível em `http://localhost:3000/`. Você pode tentar acessar a rota de _health check_ (`http://localhost:3000/health`), bem como a documentação (_Swagger_) do projeto (`http://localhost:3000/docs`).

## Processo de _deploy_

Levando em consideração o porte do projeto, assim como questões de custos, seguimos um caminho mais simples para o _deploy_ da aplicação. Em uma instância _Amazon EC2_, instalamos as ferramentas necessárias (_git_, _docker_, _docker-compose_) e então seguimos os passos descritos na seção acima. Por fim, configuramos as regras, nos grupos de segurança, para permitir o acesso externo à nossa aplicação. [Aqui](http://ec2-44-203-151-142.compute-1.amazonaws.com:3000/docs), você consegue acessar a documentação da aplicação.
