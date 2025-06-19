#!/bin/bash

# Script para instalar PM2 e iniciar o sistema automaticamente

# Instalar PM2 globalmente
npm install -g pm2

# Entrar na pasta do projeto (ajuste o caminho conforme necessário)
cd /var/www/frota-app

# Instalar dependências
npm install

# Build do Next.js
npm run build

# Parar app se já estiver rodando
pm2 stop frota-app || true

# Iniciar app com PM2
pm2 start npm --name "frota-app" -- start

# Salvar configuração do PM2 para reiniciar no boot
pm2 save

echo "PM2 instalado e aplicação iniciada com sucesso."
