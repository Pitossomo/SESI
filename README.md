# SESI - Sistema de Gerenciamento de Veículos e Rastreamento

Este é um sistema de gerenciamento de veículos e rastreamento que foi desenvolvido usando Next.js no front-end, Nest.js no back-end e React Native no aplicativo móvel. Este sistema foi criado para permitir que os proprietários de frotas monitorem a localização de seus veículos em tempo real e gerenciem sua manutenção e programação de rotas.

## Requisitos de instalação

* Node.js 14.x ou superior
* PNPM

# Instalação

1. Clone o repositório:

```zsh
git clone https://github.com/Sjhns/SESI.git
```

2. Instale as dependências:

```zsh
cd sistema-de-gerenciamento
pnpm install
```
3. Execute as migrações do banco de dados:

```zsh
pnpm prisma migrate
```

4. Inicie o servidor:

```zsh
pnpm start
```

## Funcionalidades

### Página inicial

A página inicial mostra um mapa com os veículos da frota marcados. Clicar em um marcador mostra mais informações sobre o veículo, como sua posição atual, velocidade e status da manutenção.

### Gerenciamento de Veículos

A página de gerenciamento de veículos permite visualizar, criar, editar e excluir informações sobre os veículos da frota. As informações incluem o número da placa, o modelo, o ano, o status da manutenção e a programação de rotas.

### Gerenciamento de Rotas
 
A página de gerenciamento de rotas permite criar e gerenciar as rotas dos veículos da frota. As rotas podem ser criadas especificando os locais de partida e destino, bem como quaisquer paradas intermediárias.

### Rastreamento de Veículos

O aplicativo móvel permite que os motoristas da frota sejam rastreados em tempo real. Os motoristas podem visualizar sua própria localização e receber informações sobre as rotas a seguir.