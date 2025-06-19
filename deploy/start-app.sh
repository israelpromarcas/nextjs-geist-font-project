#!/bin/bash

# Script para iniciar o sistema de frota na VPS

# Entrar na pasta do projeto (ajuste o caminho conforme necessário)
cd /var/www/frota-app

# Verificar se o diretório existe e contém package.json
if [ ! -f package.json ]; then
  echo "Erro: package.json não encontrado no diretório /var/www/frota-app"
  exit 1
fi

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
