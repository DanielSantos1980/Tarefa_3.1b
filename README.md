# Animalec — Tarefa 3.1b

Programação Web Avançada — 1.º ano do Mestrado em Engenharia Informática e Tecnologia Web

## Objetivo

O trabalho acrescenta duas entidades à área de administração do Animalec: **Patrocinadores (sponsors)** e **Especialistas científicos (experts)**.

## Páginas

- `index.html` — página principal, com animais, regras, quizzes, contactos e acesso à documentação.
- `admin.html` — entrada e painel de administração, com ligações para documentação e testes.
- `sponsors.html` — gestão dos patrocinadores.
- `experts.html` — gestão dos especialistas científicos.
- `css/styles.css` — estilos e adaptação para dispositivos móveis.
- `js/data.js` — dados iniciais e campos de cada entidade.
- `js/app.js` — menus, formulários, pesquisa e gestão dos registos.
- `docs.html` — consulta da documentação no próprio site.
- `testes.html` — consulta dos resultados dos testes no próprio site.
- `design/` — wireframes e mockups para computador e telemóvel; ficheiro draw.io para edição.
- `docs/` — planeamento e relação com os capítulos do livro.
- `testes/` — resultados das verificações.

## Novas entidades

**Patrocinadores:** nome, área de atuação, contacto, email, tipo de apoio, animais associados e estado.

**Especialistas:** nome, área científica, instituição, email, animais associados e estado.

Cada registo pode estar associado a vários animais. Os dados são guardados no armazenamento local do navegador.

## Wireframes, mockups e HTML5

Para as duas entidades existem wireframes e mockups de computador e telemóvel. Os desenhos podem ser consultados em `design/galeria.html` e editados através de `design/wireframes-editaveis.drawio`.

As páginas usam elementos HTML5 como `header`, `nav`, `main`, `section`, `form`, `table` e `footer`. No computador, os registos aparecem em tabelas; no telemóvel, são apresentados em cartões.

## Documentação e testes no site

A partir da página principal ou do menu da administração, é possível abrir **Documentação** e **Testes**. As duas páginas apresentam o conteúdo dos documentos guardados nas pastas `docs/` e `testes/`.

## Testes

A navegação e as operações principais foram verificadas em navegador. Os resultados encontram-se em `testes/RESULTADOS.md`.

## Referências

- Portela, F., & Queirós, R. (2020). *Desenvolvimento Avançado para a Web*. Capítulos A.2 e A.3.
- MDN Web Docs. [Structuring documents](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents).
