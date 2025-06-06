# Veja se está no diretório raiz do projeto (onde estão package.json e Dockerfile)
FROM node:18-alpine

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json e instala dependências
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código para dentro do container
COPY . .

# Expõe a porta que a aplicação usará
EXPOSE 4000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
