"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Primeiro, criar o usuário padrão se não existir
      await fetch("/api/init-default-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src="/grupo-promarcas.png"
            alt="Grupo Promarcas"
            style={{
              width: '200px',
              marginBottom: '20px'
            }}
          />
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#333',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px'
          }}>
            GRUPO PROMARCAS
          </h1>
          <p style={{
            color: '#666',
            fontSize: '14px',
            margin: 0
          }}>
            Acesse o sistema com suas credenciais
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4B7688'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              marginBottom: '8px'
            }}>
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4B7688'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {error && (
            <div style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '14px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#9ca3af' : '#4a5568',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              marginBottom: '20px',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.background = '#2d3748';
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.background = '#4a5568';
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#666',
            borderTop: '1px solid #e1e5e9',
            paddingTop: '20px'
          }}>
            <p style={{ margin: '0 0 4px 0' }}>Ou</p>
            <p style={{ margin: '0 0 16px 0', fontWeight: '500' }}>Solicitar Acesso</p>
            <p style={{ margin: 0 }}>Novos usuários precisam de aprovação do administrador.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
