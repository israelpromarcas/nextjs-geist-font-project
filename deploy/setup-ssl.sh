#!/bin/bash

# Install Certbot and Nginx plugin
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx \
  -d frota.promarcas.com.br \
  --non-interactive \
  --agree-tos \
  --email admin@promarcas.com.br \
  --redirect \
  --staple-ocsp

# Auto-renew cron job
echo "0 0 * * * certbot renew --quiet" | crontab -

# Restart Nginx
systemctl restart nginx

echo "SSL setup complete! Your site should now be accessible via HTTPS."
echo "Certificate will auto-renew when needed."
