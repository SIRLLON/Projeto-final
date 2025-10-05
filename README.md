FinanSmart - Aplicativo de Gestão Financeira
Este é o repositório do FinanSmart, um aplicativo de controle financeiro desenvolvido como parte do Projeto de Bloco da disciplina de Desenvolvimento Front-end com Frameworks. A aplicação foi construída de forma incremental, começando com uma versão web em ReactJS e evoluindo para uma versão mobile com React Native e Expo.

Links Importantes:

Versão Mobile (Snack Expo): [Acesse o FinanSmart Mobile aqui](https://snack.expo.dev/@sirllon/projeto-final?platform=android)

Board de Gestão (Notion): [Veja nosso processo Scrum em ação](https://www.notion.so/b4ece348c848401c82552fe1c9d12626?v=c343c4bee72b45b387b2682725e59db7)

Principais Funcionalidades
Gestão de Transações: Funcionalidade completa de CRUD (Criar, Ler, Atualizar, Deletar) para transações financeiras.

Dashboard Intuitivo: Visualização rápida do saldo total, com resumo de entradas e saídas.

Relatórios com Gráficos: Página de relatórios com um gráfico de pizza para análise visual do fluxo financeiro.

Cotações em Tempo Real: Integração com uma API pública para exibir cotações de Dólar e Euro.

Experiência Mobile Nativa: Interface adaptada para mobile com recursos como acesso à câmera, notificações push e gestos (puxar para atualizar e arrastar para o lado).

Exportação de Dados: Funcionalidade para exportar o histórico de transações para um arquivo .csv.

Autenticação: Fluxo de login simulado para proteção das rotas principais.

Tecnologias Utilizadas
Core: ReactJS, React Native, Expo

UI e Gráficos: react-chartjs-2, react-icons

Testes: Jest, React Testing Library

Recursos Nativos: Expo Camera, React Native PanResponder

Armazenamento Local: AsyncStorage

Como Executar o Projeto
Pré-requisitos
Node.js e npm (ou Yarn) instalados.

Instalação
Clone o repositório:

git clone [https://github.com/SIRLLON/Projeto-final.git](https://github.com/SIRLLON/Projeto-final.git)

Navegue até a pasta do projeto:

cd Projeto-final

Instale as dependências:

npm install

Scripts Disponíveis
npm start: Inicia a aplicação em modo de desenvolvimento. Abra http://localhost:3000 para ver no navegador.

npm test: Executa a suíte de testes automatizados com Jest e React Testing Library.

npm run build: Compila a aplicação para produção na pasta build.

Credenciais de Acesso
Para testar a aplicação, utilize as seguintes credenciais estáticas:

Usuário: teste

Senha: 1234