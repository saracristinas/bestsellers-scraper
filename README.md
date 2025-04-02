# 📌 Amazon Bestsellers Scraper API

Este projeto é uma API Serverless que utiliza um web scraper para capturar os produtos mais vendidos da Amazon Brasil. Os dados extraídos são armazenados no DynamoDB e podem ser acessados por meio de um endpoint HTTP. O scraper roda localmente e alimenta o banco de dados na AWS, enquanto a API é hospedada na AWS utilizando Lambda e API Gateway.

---

## 📋 Sumário
1. [✅ Requisitos Obrigatórios](#-requisitos-obrigatórios)
2. [🛠️ Tecnologias Utilizadas](#%EF%B8%8F-tecnologias-utilizadas)
3. [🚀 Como Rodar Localmente](#-como-rodar-localmente)
4. [🌐 Endpoint da API em Produção](#-endpoint-da-api-em-produção)
5. [📄 Endpoints Disponíveis](#-endpoints-disponíveis)
6. [🔐 Autenticação](#-autenticação)
7. [📝 Sobre o Desenvolvimento](#-sobre-o-desenvolvimento)
8. [🎯 Próximos Passos](#-próximos-passos)
9. [📞 Contato](#-contato)

---

## ✅ Requisitos Obrigatórios

✔ Criar um scraper para pegar os produtos mais vendidos da Amazon  
✔ Salvar os produtos no DynamoDB  
✔ Criar uma API que retorna os produtos armazenados no DynamoDB  
✔ Usar AWS Lambda para processar as requisições  
✔ Usar API Gateway para expor a API  
✔ Usar Serverless Framework para gerenciar a infraestrutura  
✔ Usar Node.js (sem TypeScript)  
✔ Criar commits organizados para mostrar seu processo de trabalho  

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**  
- **Puppeteer** (para scraping)  
- **AWS Lambda** (para funções serverless)  
- **AWS API Gateway** (para expor os endpoints)  
- **AWS DynamoDB** (banco de dados NoSQL)  
- **Serverless Framework** (para gerenciar a infraestrutura)  

---

## 🚀 Como Rodar o Projeto

### 📌 **Se quiser apenas acessar os produtos já salvos na AWS:**

Se você deseja **somente consultar os produtos** sem rodar nada localmente, basta acessar a API já hospedada na AWS:

```sh
curl -X GET https://apmou89x9b.execute-api.us-east-1.amazonaws.com/products
```

Isso retornará os produtos que já estão armazenados no **DynamoDB na AWS**.

---

### 📌 **Rodando o Scraper Localmente (para popular a AWS)**

Se você quiser **rodar o scraper e adicionar mais produtos ao banco na AWS**, siga estes passos:

1️⃣ **Clonar o repositório:**

```sh
git clone https://github.com/saracristinas/bestsellers-scraper.git
```

2️⃣ **Instalar dependências:**

```sh
npm install
```

3️⃣ **Rodar o scraper para popular o banco na AWS:**

```sh
node scraper.js
```

Agora os produtos foram adicionados ao DynamoDB na AWS e podem ser acessados pela API online.

---

### 📌 **Rodando a API Localmente**

Se quiser testar a API **localmente**, é necessário instalar o **Serverless Framework**.

1️⃣ **Instalar o Serverless Framework:**

```sh
npm install -g serverless
```

2️⃣ **Rodar a API localmente:**

```sh
serverless offline
```

Agora os endpoints estarão disponíveis localmente, por exemplo:

```sh
curl -X GET http://localhost:3000/products
```

⚠ **Se estiver usando DynamoDB localmente**, você precisa rodar o banco antes:

```sh
serverless dynamodb start
```

Se não rodar o scraper, a API local **retornará uma lista vazia**.

---

## 📝 Sobre o Desenvolvimento

Este projeto foi desenvolvido para demonstrar habilidades em **web scraping, AWS e Serverless Framework**. Durante o desenvolvimento, enfrentei desafios como otimização do Puppeteer para rodar em ambientes restritos e configuração de infraestrutura serverless.

A principal decisão foi manter a API **simples e direta**, sem adicionar camadas desnecessárias. A API funciona sem necessidade de autenticação e os dados são extraídos diretamente da Amazon com um identificador real do produto.

---
## 📄 Endpoints Disponíveis

### 🔹 `GET /products`
Retorna os produtos armazenados no DynamoDB.

**Parâmetros Opcionais:**
- `quantity` (número de produtos a serem retornados, ex: `3`, `5`, `10`)

**Exemplo de Requisição:**
```sh
curl -X GET https://apmou89x9b.execute-api.us-east-1.amazonaws.com/products?quantity=5
```

---

## 🔐 Autenticação
Atualmente, não há autenticação na API, pois o scraper roda localmente. No futuro, medidas de segurança poderão ser implementadas.

---

## 🌐 Endpoint da API em Produção

A API está disponível na AWS e pode ser acessada pelo seguinte endpoint:

🔗 https://apmou89x9b.execute-api.us-east-1.amazonaws.com/products

---

## 📝 Sobre o Desenvolvimento

Ao iniciar este projeto, minha principal preocupação foi estruturar o código de forma clara e objetiva. Inicialmente, considerei dividir o código em controllers, services e routes, mas percebi que para um projeto desse porte, manter a estrutura simples e direta era a melhor escolha.

No início, tive desafios ao configurar o Serverless Framework, principalmente na configuração das credenciais da AWS. A documentação nem sempre era clara, e foi preciso bastante tentativa e erro para conseguir fazer o deploy corretamente.

Outro grande desafio foi o Puppeteer. Ele é pesado e não funciona diretamente na AWS Lambda devido ao limite de tamanho. Para resolver isso, utilizei `chrome-aws-lambda` e `puppeteer-core`, que são versões otimizadas para ambientes serverless. Essa adaptação foi um dos momentos mais desafiadores do projeto.

A extração dos dados do site da Amazon também exigiu atenção. Utilizei `querySelector` para capturar os elementos do DOM e implementei regex para extrair o ID real dos produtos a partir da URL. Dessa forma, a API consegue manter os dados organizados e confiáveis.

Por fim, para a API, inicialmente pensei em utilizar Express.js, mas percebi que o API Gateway já faz esse trabalho, tornando essa dependência desnecessária. Removi para deixar o projeto mais leve e eficiente.

O resultado final é uma API funcional e bem estruturada, atendendo aos requisitos do desafio e proporcionando uma base sólida para futuras melhorias.

---
## 🎯 Próximos Passos

- **Adicionar novos endpoints** para mais funcionalidades.
- **Melhorar o scraper** para garantir que colete os dados corretamente.
- **Implementar autenticação** para proteger a API.
- **Melhorar logs e monitoramento** para identificar erros mais facilmente.

---

## 🎯 Considerações Finais

Esse projeto foi um grande desafio para mim, principalmente porque precisei aprender muitas coisas novas em pouco tempo. Desde o Serverless Framework até a otimização do Puppeteer para rodar na AWS, cada etapa foi uma jornada de aprendizado.

Apesar de não estar 100% perfeito e ter alguns detalhes que poderiam ser refinados, estou muito orgulhosa do que consegui entregar. Foram longos dias estudando, testando, errando e tentando novamente, mas valeu a pena. A experiência de desenvolver essa API me ensinou muito sobre arquitetura serverless, scraping e AWS, e sei que tudo isso será útil nos meus próximos projetos.

No fim, o mais importante foi ter concluído o desafio e aprendido tanto no processo. Cada erro e acerto me ajudaram a evoluir como desenvolvedora, e isso é o que mais me motiva a continuar.

---


## 📞 Contato
Caso tenha alguma dúvida ou sugestão, entre em contato!

👩‍💻 **Desenvolvedora:** [Sara Cristina](https://github.com/saracristinas)  
📧 **Email:** [sarasales17062000@gmail.com](mailto:sarasales17062000@gmail.com)




