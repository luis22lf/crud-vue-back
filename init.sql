-- Criar tabela equipamentos
CREATE TABLE IF NOT EXISTS equipamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    situacao VARCHAR(100) NOT NULL
);

-- Criar tabela usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    email VARCHAR(100) PRIMARY KEY,
    senha VARCHAR(100) NOT NULL
);

-- Inserir um usuário padrão
INSERT INTO usuarios (email, senha) 
VALUES ('admin@brenga.com', '$2b$10$s4TKxPaUg.0Ed62klYYoo..7D6kRpLefOj0TNgez850RWwbwJ.Uf2')
ON CONFLICT (email) DO NOTHING;

-- Inserir alguns equipamentos de exemplo
INSERT INTO equipamentos (nome, situacao) VALUES 
('Maquina1', 'funcional'),
('Maquina2', 'quebrado'),
('Maquina3', 'uso-exclusivo')
ON CONFLICT DO NOTHING;