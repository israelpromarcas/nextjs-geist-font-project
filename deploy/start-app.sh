#!/bin/bash

# Script para iniciar o sistema de frota na VPS

# Entrar na pasta do projeto (ajuste o caminho conforme necessário)
cd /path/para/seu/projeto

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

echo "Aplicação iniciada com PM2."
