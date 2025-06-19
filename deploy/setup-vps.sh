#!/bin/bash

# Script para preparar VPS para rodar o sistema de frota

# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (versão 18.x)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2 para gerenciar o processo Node.js
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx

# Configurar firewall para liberar HTTP e HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw enable

echo "Setup inicial concluído. Por favor, envie o código do projeto para a VPS e configure as variáveis de ambiente."
