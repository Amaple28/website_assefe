# ASSEFE - Redesign Project 🚀✨

Este projeto é uma proposta de modernização completa para o portal da **ASSEFE** (Associação dos Servidores do Senado Federal). O objetivo foi transformar um site institucional em uma experiência digital moderna, focada no usuário e alinhada às tendências atuais de design, acessibilidade e performance.

---

## 🔄 Antes & Depois

| Site Antigo | Site Novo |
|:-----------:|:---------:|
| ![Antes](images/screencapture-antes.png) | ![Depois](images/screencapture-depois.png) |

> 🔗 [Ver Preview do Projeto](https://amaple28.github.io/assefe_site/)

---

## 🎯 O que mudou?

O foco principal do redesign foi **Modernidade, Acessibilidade e Transparência**, valores centrais da associação.

- **Arquitetura de Informação**: Reorganização das seções (Lazer, Institucional, Eventos, Aposentados, Mês a Mês) para facilitar a navegação e descoberta de conteúdo.

- **Identidade Visual**: Design moderno com gradientes, cards interativos e uso estratégico de ícones que transmitem profissionalismo e acolhimento.

- **Acessibilidade**: Barra de acessibilidade com controle de tamanho de fonte e modo de alto contraste para inclusão de todos os usuários.

- **UX Writing**: Textos mais diretos, focados em resolver as necessidades do servidor e seus dependentes.

- **Responsividade**: Estrutura "mobile-first" com menu hambúrguer funcional para garantir que o site funcione perfeitamente em qualquer dispositivo.

- **Transparência**: Seção "Mês a Mês" dedicada para acompanhamento das manutenções do clube com fotos e relatórios detalhados.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5 / CSS3 / JavaScript (ES6+)
- **Framework CSS**: Tailwind CSS (CDN) + CSS Personalizado
- **Ícones**: Font Awesome 6.4.0
- **UI Design**: Design moderno com foco em acessibilidade e usabilidade
- **APIs**: Open-Meteo API (Clima em tempo real)
- **Mapas**: Google Maps Embed + Integração Waze
- **Performance**: Otimização de ativos para carregamento rápido (Core Web Vitals)

---

## 📂 Funcionalidades Destacadas

### 🏠 Página Principal
- **Hero Section Impactante**: Proposta de valor clara com CTA para associação
- **Acesso Rápido**: Cards interativos para navegação rápida
- **Notícias e Eventos**: Seção dinâmica com últimas novidades
- **Widget de Clima**: Informações em tempo real de Brasília
- **Localização**: Mapa integrado com botões para Google Maps e Waze

### 📋 Mês a Mês
- **Navegação por Meses**: Menu sticky para rápido acesso aos 12 meses
- **Grid de Manutenções**: Itens organizados com links para fotos
- **Transparência Total**: Relatório completo das obras e melhorias do clube

### 🏛️ Institucional
- **Scroll Spy Navigation**: Menu lateral que acompanha a rolagem
- **Conselho Deliberativo**: Galeria de fotos dos conselheiros
- **Nossa Equipe**: Apresentação visual dos colaboradores

### 👴 Espaço do Aposentado
- **Cards de Testemunhos**: 11 histórias de aposentados em PDF
- **Design Empático**: Cores e tipografia pensadas para este público

### 📅 Eventos
- **Filtro por Categoria**: Próximos, Recorrentes e Passados
- **Galeria de Imagens**: Registro visual dos eventos

### ♿ Recursos de Acessibilidade
- Controle de tamanho de fonte (slider)
- Modo de alto contraste
- Semântica HTML5 para leitores de tela
- Navegação por teclado

---

## 📁 Estrutura do Projeto

```
assefe_site/
├── css/
│   └── styles.css          # Estilos personalizados (~2500+ linhas)
├── js/
│   └── main.js             # JavaScript modular (~560 linhas)
├── images/
│   ├── logo.png
│   ├── clube_assefe.png
│   └── ...                 # Imagens do projeto
├── index.html              # Página principal
├── institucional.html      # Página institucional
├── eventos.html            # Página de eventos
├── aposentados.html        # Espaço do aposentado
├── mes-a-mes.html          # Relatório mensal de manutenções
└── README.md               # Documentação
```

---

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| ![#1e40af](https://via.placeholder.com/15/1e40af/1e40af.png) | `#1e40af` | Azul Primário |
| ![#3b82f6](https://via.placeholder.com/15/3b82f6/3b82f6.png) | `#3b82f6` | Azul Secundário |
| ![#10b981](https://via.placeholder.com/15/10b981/10b981.png) | `#10b981` | Verde (Sucesso) |
| ![#f59e0b](https://via.placeholder.com/15/f59e0b/f59e0b.png) | `#f59e0b` | Amarelo (Destaque) |
| ![#1e293b](https://via.placeholder.com/15/1e293b/1e293b.png) | `#1e293b` | Cinza Escuro (Footer) |

---

## 🔧 Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/Amaple28/assefe_site.git
```

2. Abra o arquivo `index.html` no navegador ou use um servidor local:
```bash
# Com Python
python -m http.server 8000

# Com Node.js
npx serve
```

3. Acesse `http://localhost:8000`

---

## 📱 Responsividade

O site foi desenvolvido com abordagem **mobile-first** e testado nos seguintes breakpoints:

- 📱 Mobile: < 768px
- 📱 Tablet: 768px - 1024px
- 💻 Desktop: > 1024px

---

## 🌟 Próximos Passos

- [ ] Implementar sistema de busca global
- [ ] Adicionar página de Convênios
- [ ] Integrar formulário de contato
- [ ] Implementar PWA para acesso offline
- [ ] Adicionar animações com Intersection Observer

---

## 👩‍💻 Desenvolvido por

**Maisa Rodrigues**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/maisaourodrigues)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Amaple28)

---

## 📄 Licença

Este projeto foi desenvolvido para fins de portfolio e demonstração de habilidades em desenvolvimento frontend e UX/UI Design.

---

> *"Transformando a experiência digital dos servidores do Senado Federal"* 🏛️
