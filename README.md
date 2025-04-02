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
8. [🎯 Considerações Finais](#-considerações-finais)
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

## 🚀 Como Rodar Localmente

### 1️⃣ Pré-requisitos
Antes de começar, **certifique-se** de ter instalado:

- **Node.js** (v20 ou superior)  
- **NPM** ou **Yarn**  
- **AWS CLI** configurado (caso queira testar com DynamoDB na AWS)  
- **Serverless Framework** instalado globalmente:  
  ```sh
  npm install -g serverless
  ```

### 2️⃣ Instalar Dependências
No diretório do projeto, execute:  
```sh
npm install
```

### 3️⃣ Rodar o DynamoDB Localmente *(Opcional)*
Se você deseja testar sem precisar da AWS, pode rodar o DynamoDB localmente:  
```sh
serverless dynamodb start
```
⚠️ **Observação:** Certifique-se de que o plugin `serverless-dynamodb-local` está instalado e configurado no `serverless.yml`. Se ainda não estiver, instale com:  
```sh
npm install --save-dev serverless-dynamodb-local
```

### 4️⃣ Rodar a API Localmente
Execute o seguinte comando para iniciar a API:  
```sh
serverless offline --reloadHandler
```
Isso disponibilizará os endpoints localmente.  

⚠️ **Se o comando não funcionar**, tente:  
```sh
serverless offline
```

---

## 🌐 Endpoint da API em Produção

A API está disponível na AWS e pode ser acessada pelo seguinte endpoint:

🔗 https://apmou89x9b.execute-api.us-east-1.amazonaws.com/products

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

### 🔹 `POST /scrape`
Executa o scraper manualmente para buscar novos produtos e armazená-los no DynamoDB.

**Exemplo de Requisição:**
```sh
curl -X POST https://apmou89x9b.execute-api.us-east-1.amazonaws.com/scrape
```

---

## 🔐 Autenticação
Para acessar o serviço localmente, você precisará configurar as credenciais da AWS na sua máquina.

---

## 📝 Sobre o Desenvolvimento

Quando comecei esse projeto, minha primeira ideia foi estruturar o código separando controllers, services e routes. No entanto, com o tempo, percebi que essa divisão acabava sendo desnecessária para um projeto desse porte. Decidi então simplificar a organização, deixando tudo mais direto e fácil de manter.

No início, também enfrentei dificuldades com o Serverless Framework. Eu não conhecia muito bem a ferramenta e, além disso, precisei aprender sobre as credenciais da AWS para conseguir fazer o deploy corretamente. Confesso que esse foi um dos momentos mais desafiadores, pois os erros relacionados à configuração das credenciais não eram muito claros no começo.

Outro problema grande foi lidar com as dependências do projeto. O Puppeteer, por exemplo, deu muito trabalho. Ele é pesado, e ao tentar rodá-lo na AWS Lambda, descobri que ultrapassava o limite de tamanho permitido. Depois de algumas pesquisas, encontrei uma solução: usar chrome-aws-lambda (uma versão reduzida do Chrome) e puppeteer-core, que é uma versão mais leve da biblioteca. Foi um aprendizado e tanto, mas no final consegui fazer com que o scraper rodasse corretamente.

Depois que o scraping estava funcionando, precisei garantir que os dados fossem extraídos corretamente. Usei querySelector para capturar informações do DOM da Amazon e ainda implementei regex para extrair o ID real dos produtos a partir da URL. Isso garantiu que os dados fossem coletados de maneira confiável, sem depender apenas da estrutura visual da página, que pode mudar com o tempo.

Com o scraper pronto, passei para a parte da API. Inicialmente, pensei em usar Express.js, mas depois percebi que isso era desnecessário, já que o API Gateway já cuida do roteamento. Acabei removendo essa dependência para deixar o projeto mais leve e otimizado.

No final, apesar dos desafios, fiquei satisfeita com o resultado. O projeto agora está funcional, simples e cumpre bem seu objetivo. Ainda há espaço para melhorias, mas ele já atende completamente aos requisitos do desafio!

---
## 🎯 Próximos Passos

Melhorar o funcionamento do scraper para garantir que colete os dados corretamente.

Implementar autenticação para proteger a API.

Melhorar logs e monitoramento para identificar erros mais facilmente.

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




