# 🏋️ Sistema de Gestão de Academia (SGA)

Sistema web para gerenciamento completo das operações de uma academia de ginástica — alunos, treinos, aulas, planos, patrimônio, avaliações físicas e muito mais.

Projeto desenvolvido para a disciplina de **Engenharia de Software II**, do Departamento de Computação da **Universidade Federal de Sergipe (UFS)**, sob orientação do Prof. Michel Dos Santos Soarez.

---

## 📋 Sobre o Projeto

O SGA nasce da necessidade de substituir processos manuais (ou soluções genéricas de planilhas) por uma plataforma dedicada, capaz de automatizar e centralizar as principais rotinas de uma academia: matrícula e acompanhamento de alunos, montagem de treinos personalizados, controle de aulas e planos, gestão de patrimônio (equipamentos) e emissão de relatórios gerenciais.

O sistema foi modelado seguindo a norma **IEEE 830** para especificação de requisitos e a **ISO/IEC/IEEE 42010** para descrição de arquitetura de software, com toda a documentação (casos de uso, diagramas de classe, sequência e atividades) elaborada em **UML**.

### Principais funcionalidades

- 👥 **Gestão de Alunos** — cadastro, edição, remoção, histórico de presença e vínculo com planos e aulas
- 🏋️ **Gestão de Treinos e Exercícios** — criação de treinos personalizados por instrutores
- 📅 **Gestão de Aulas** — cadastro, agendamento e controle de participação
- 💳 **Gestão de Planos** — administração de planos e vínculo com alunos
- 🧑‍💼 **Gestão de Funcionários** — cadastro, promoção a administrador e controle de acesso
- 🏢 **Gestão de Patrimônio** — inventário e controle de manutenção de equipamentos
- 🧍 **Gestão de Visitantes** — controle de acesso e histórico de visitas
- 📏 **Avaliações Físicas** — cadastro e acompanhamento periódico dos alunos
- 📊 **Relatórios** — financeiros, inventário, avaliações físicas e fichas de treino
- 🔐 **Segurança** — autenticação de usuários e criptografia de dados, em conformidade com a **LGPD**

---

## 🏗️ Arquitetura

O sistema adota o padrão arquitetural **MVC (Model-View-Controller)**, escolhido pela separação clara de responsabilidades, facilidade de manutenção/testes e adequação à escala prevista para o projeto.

```
┌─────────────┐      Request       ┌─────────────┐      Request Data     ┌─────────────┐
│    View     │ ─────────────────► │ Controller  │ ────────────────────► │    Model    │
│ (Interface) │ ◄───────────────── │  (Lógica)   │ ◄──────────────────── │   (Dados)   │
└─────────────┘      Response      └─────────────┘      Response Data    └─────────────┘
```

- **Model** — Administrador, Instrutor, Funcionário, Contrato, Endereço, Treino, Aluno, Exercício, Aula, Plano, Avaliação Física, Visitante, Aparelho.
- **View** — telas de Login, Funcionário, Aluno, Treino, Aulas, Planos, Avaliação Física, Visitantes, Material e Exercício.
- **Controller** — `CtlLogin`, `CtlFuncionario`, `CtlAluno`, `CtlTreino`, `CtlExercicio`, `CtlAulas`, `CtlPlanos`, `CtlVisitante`, `CtlAvFisica`, `CtlGestMaterial`.

### Fluxo geral de uma requisição

1. O frontend envia uma requisição HTTP para o backend via API REST.
2. O backend valida os dados recebidos.
3. Os dados são persistidos/recuperados no banco de dados.
4. A resposta é enviada de volta ao frontend, que atualiza a interface.

A autenticação é feita por usuário e senha, com hash seguro (bcrypt/SHA-256) e controle de sessão via token (JWT ou cookies seguros).

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
|---|---|
| **Frontend** | React.js, HTML5, CSS3, JavaScript · protótipos em Figma |
| **Backend** | Python + Flask (microframework) |
| **Banco de Dados** | PostgreSQL |
| **Infraestrutura** | Hospedagem em nuvem (Render/Railway), com previsão de escalabilidade vertical e horizontal |
| **Monitoramento** | Prometheus + Grafana (previsto) |

> **Por que essas escolhas?**
> - **React.js** permite interfaces ricas e responsivas para os diferentes perfis de usuário (alunos, instrutores, administradores).
> - **Flask** oferece simplicidade para implementar os Controllers e a API REST que faz a ponte entre View e Model.
> - **PostgreSQL** foi escolhido por ser um banco relacional robusto, com bom suporte a integridade referencial e consultas complexas — essencial para os relacionamentos entre Aluno, Treino, Aula, Plano etc.

---

## 👤 Perfis de Usuário

| Perfil | Principais responsabilidades |
|---|---|
| **Administrador** | Gestão de pessoas, finanças e operações gerais; geração de relatórios; configuração do sistema |
| **Recepcionista/Atendente** | Cadastro de membros, agendamento de aulas, check-in e pagamentos |
| **Instrutor** | Criação de treinos personalizados, avaliações físicas e acompanhamento de progresso |
| **Aluno** | Consulta de treinos, pagamentos, agendamentos e autoatendimento |

---

## 🗄️ Modelo de Dados

Principais entidades mapeadas no banco relacional:

```
Aluno(matricula, nome, data_nascimento, cpf, email, telefone, id_plano)
Plano(id_plano, nome, valor, descricao)
Funcionario(NIT, nome, data_nascimento, cpf, email, telefone)
Administrador(NIT, cargo)
Instrutor(NIT, grau_academico)
Endereco(id_endereco, logradouro, cep, rua, num_casa, bairro, cidade, NIT, matricula)
Aula(id_aula, horario, tipo, sala)
Treino(id_treino, objetivo, dificuldade)
Exercicio(id_exercicio, nome, musculo, series, repeticoes)
Aparelho(id_aparelho, nome, numero_serie, disponibilidade)
Contrato(id_contrato, salario, data_contratacao, data_final, NIT)
Visitante(id_visitante, nome, data_ultima_visita, telefone, qtd_visitas)
Avaliacao_Fisica(id_avaliacao, altura, peso, observacoes, biotipo, medidas, NIT, matricula)
Usuario(id_usuario, NIT, username, senha_hash, is_admin)
```

Relacionamentos N:N (Aula–Aluno, Aula–Funcionário, Treino–Aluno, Exercício–Treino, Exercício–Aparelho) são resolvidos por tabelas associativas dedicadas.

A documentação completa inclui diagramas de **casos de uso**, **classes (análise e projeto)**, **sequência** e **atividades**, disponíveis na pasta `/docs` do repositório.

---

## ✅ Requisitos Não Funcionais (destaques)

- **Desempenho**: operações de CRUD de aluno em até 30 segundos.
- **Confiabilidade**: integridade garantida dos dados durante cadastro, remoção e modificação.
- **Usabilidade**: curva de aprendizado de até 2 meses para domínio total das funcionalidades de gestão de alunos, sem treinamento técnico especializado.
- **Segurança**: controle de acesso obrigatório para 100% das operações sensíveis.
- **Compatibilidade**: Windows 10 e Ubuntu 22 LTS.
- **Escalabilidade**: tempo de resposta máximo de 2 segundos por operação, mesmo com crescimento da base de alunos.
- **Conformidade legal**: aderência à **LGPD**.

---

## 👥 Equipe

Projeto desenvolvido por discentes do curso de Ciência da Computação da UFS:

- Riquelme Prado Leite
- Leandro Santos Lima
- Luigi Machado Eduardo
- Cainã Castro Aquino
- Edcarlos dos Santos Ramos
- João Vitor Santos
- José Freire Falcão Neto

---

## 📚 Referências

- SOMMERVILLE, Ian. *Engenharia de Software*. 9ª Edição. McGraw-Hill.
- IEEE Std 830 — Recommended Practice for Software Requirements Specifications.
- ISO/IEC/IEEE 42010 — Systems and software engineering — Architecture description.

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ e npm
- Python 3.10+ (backend)
- PostgreSQL

### Frontend

O frontend é construído com **Vite + React 19**.

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173` (padrão do Vite).

Outros scripts disponíveis:

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Serve localmente o build de produção gerado |
| `npm run lint` | Executa o ESLint no código |

**Principais dependências:** `react` / `react-dom` (v19), `react-router-dom` (v7) para roteamento, `axios` para consumo da API REST do backend.

### Backend

O backend é construído com **Flask** + **Flask-SQLAlchemy** (ORM), **Flask-CORS** (para aceitar requisições do frontend) e **psycopg2** como driver do PostgreSQL.

```bash
# Entre na pasta do backend
cd backend

# Crie e ative um ambiente virtual
python -m venv venv
source venv/bin/activate      # Linux/macOS
venv\Scripts\activate         # Windows

# Instale as dependências
pip install -r requirements.txt

# Crie um arquivo .env na raiz do backend com, no mínimo:
# DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
# FLASK_APP=app.py
# FLASK_ENV=development

# Rode o servidor
flask run
# ou, se o entry point usa app.run() diretamente:
python app.py
```

O backend ficará disponível por padrão em `http://localhost:5000`.

> ℹ️ **Nota:** o comando acima assume que o arquivo de entrada da aplicação é `app.py` — ajuste `FLASK_APP` (ou o comando `python`) caso o nome seja diferente no repositório (ex.: `main.py`, `run.py`).

**Principais dependências:** `Flask` (framework web), `Flask-SQLAlchemy` (mapeamento objeto-relacional das entidades do modelo — Aluno, Treino, Aula, Plano etc.), `Flask-CORS` (libera o consumo da API pelo frontend em outra porta/origem), `psycopg2` (conexão com PostgreSQL), `python-dotenv` (carrega variáveis do `.env`).

### Banco de Dados

1. Crie um banco PostgreSQL local (ou em nuvem) e aponte a variável `DATABASE_URL` no `.env` do backend para ele.
2. Como o projeto usa **Flask-SQLAlchemy** sem uma ferramenta de migrations (não há `Flask-Migrate`/Alembic no `requirements.txt`), as tabelas são criadas a partir dos `models` do SQLAlchemy. Normalmente isso é feito rodando, dentro do contexto da aplicação:

```python
from app import app, db

with app.app_context():
    db.create_all()
```

   Ou, se houver um script/comando dedicado no repositório para isso, use-o em vez do trecho acima.
3. As tabelas seguem o modelo relacional descrito na seção [Modelo de Dados](#-modelo-de-dados) acima (Aluno, Funcionario, Treino, Aula, Plano, Aparelho, Avaliacao_Fisica, Usuario, entre outras).

---

Projeto acadêmico desenvolvido para fins educacionais na disciplina de Engenharia de Software II — UFS, 2025.
