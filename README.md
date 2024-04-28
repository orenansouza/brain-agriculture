# brain-agriculture

Nosso projeto irá utilizar o banco de dados postgresql e nodejs versão 20.11.1.
Para rodar nosso banco de dados postgresql iremos utilizar o docker com docker-compose.

**Instalação**

Instalação do docker conforme seu sistema operacional: https://docs.docker.com/engine/install/.

Instalação do docker-compose conforme seu sistema operacional: https://docs.docker.com/compose/install/

Para finalizar a instalação da API clone o projeto no link a seguir: `git clone git@github.com:orenansouza/brain-agriculture.git`.

**Criadno .env**

Irá copiar o `.env.example` e criar o .env com as variáveis existentes no example.

**Iniciando o banco de dados**

Vá a raiz do seu projeto inicie o banco de dados com o comando `docker-compose up`.

**Instalando dependências**

Instalar dependencias com `yarn install`.

**Iniciando tabelas do banco de dados**

Vá a raiz do seu projeto e rode o comando `yarn prisma migrate dev`.

**Iniciando o projeto**

Vá a raiz do seu projeto inicie a API com o comando `yarn start` ou `npm run start` conforme preferir.

Caso queira debugar inicie a API com o comando `yarn dev` ou `npm run dev` conforme preferir.

## Rotas

### Criar Produtor rural
#### POST - /producer/create

```
  {
    "cpf_cnpj": "99.261.222/0001-25",
    "producer_name": "Fulano de Tal",
    "farm_name": "Fazenda Bela Vista",
		"city": "Florianópolis",
    "state": "SC",
    "total_area": 1004.5,
    "cultivable_area": 800.25,
    "vegetation_area": 200.25,
    "cultivation_name": "Milho"
}
```

Este método irá criar um produtor no banco de dados e caso sucesso deve retornar status code 201 e payload:

```
{
	"id": 1,
	"cpf_cnpj": 99261222000125,
	"producer_name": "Fulano de Tal",
	"farm_name": "Fazenda Bela Vista5",
	"city": "Florianópolis",
	"state": "SC",
	"total_area": 1004.5,
	"cultivable_area": 800.25,
	"vegetation_area": 200.25,
	"cultivation_name": "Milho",
	"created_at": "2024-04-28T21:12:59.844Z",
	"updated_at": "2024-04-28T21:12:59.844Z"
}
```

### Listar todos produtores rurais
#### GET - /producer

queryparams: 
```
  page: 1 (default 1),
  limit: 10 (default 10)

```

Este método irá retornar produtores do banco de dados e caso sucesso deve retornar status code 200 e payload: 

```
{
	"content": [
		{
			"id": 1,
			"cpf_cnpj": 99261222000125,
			"producer_name": "Fulano de Tal",
			"farm_name": "Fazenda Bela Vista",
			"city": "Florianópolis",
			"state": "SC",
			"total_area": 1004.5,
			"cultivable_area": 800.25,
			"vegetation_area": 200.25,
			"cultivation_name": "Milho",
			"created_at": "2024-04-28T21:12:59.844Z",
	    "updated_at": "2024-04-28T21:12:59.844Z"
		},
		... others
	],
	"pagination": {
		"page": 1,
		"limit": 10,
		"totalPage": 1,
		"totalItems": 1
	}
}
```

### Alterar produtor rural
#### PUT - /producer/:id

payload: enviar oque deve ser alterado.

Retorno deve ser status code 200 e payload:

```
  {
	"id": 1,
	"cpf_cnpj": 99261222000125,
	"producer_name": "Fulano de Tal",
	"farm_name": "Fazenda Bela Vista",
	"city": "São Paulo",
	"state": "SP",
	"total_area": 1000.5,
	"cultivable_area": 800.25,
	"vegetation_area": 200.25,
	"cultivation_name": "Milho"
}
```

### Deletar produtor rural
#### DELETE - /producer/:id

Retorno deve ser status code 204 e payload no content.

## Dashboards
### Total fazendas
#### GET - /dashboard/farms/total

Retorno deve ser status code 200 e payload:

```
  [{
		"farm_name": "Fazenda Bela Vista",
		"total": 1
  }]
```

### Total de fazendas por estado
#### GET - /dashboard/farms/total/state

Retorno deve ser status code 200 e payload:
```
  [{
		"state": "SP",
		"total": 1
  }]
```

### Total por estado
#### GET - /dashboard/farms/total/cultivation

Retorno deve ser status code 200 e payload:

```
  [{
		"cultivation_name": "Milho",
		"total": 1
  }]
```

### Total de área de cultivação e agricultável por fazenda
#### GET - /dashboard/farms/cultivation-vegenation/area

Retorno deve ser status code 200 e payload:

```
  [{
		"farm_name": "Fazenda Bela Vista",
		"cultivation_area": 800.25,
		"vegetation_area": 200.25
  }]
```

### Área total da fazenda
#### GET - /dashboard/farms/total/area

Retorno deve ser status code 200 e payload:

```
  [{
		"farm_name": "Fazenda Bela Vista3",
		"total_area": 1000.5
  }]
```

