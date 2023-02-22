## # desafio-ktech
**DESAFIO DO ESTÁGIO DE Q.A. **

## Desafio de automação de webUI de uma loja virtual / e-commerce:

Testar a pesquisa de um produto e validar seus retornos.

Utilizei o Cypress.io pra realizar essa automação, fazer todos os processos necessários e validar seus retornos por meio dos elementos possíveis, interceptando requests e etc.

**Primeiramente, na pasta da automação existe um arquivo chamado amazon-casos.xlsx, que é um arquivo em Excel com todos os casos que foram testados durante esse processo. **

# O desafio:

Foram 11 casos de teste idealizados utilizando testes funcionais por automação de ações do browser. Existe também um teste de pesquisa e validação utilizando o Page Object Model, realizando a pesquisa e fazendo as asserções necessárias.

**Além do desafio: **

Aproveitei o prazo pro envio do desafio e fiz algumas automações extras!

**Automação de login na plataforma fazendo as validações necessárias:**

Foram 3 casos de teste que validam o login da sua conta na plataforma da amazon utilizando as credenciais necessárias pra validar o login corretamente ou validar o erro de login quando é inputado algum valor errado (senha). E também um teste que faz todo o processo de login utilizando o Page Object Model e fazendo suas asserções necessárias.

Foi feito também um teste nessa área utilizando a condicional if/else por meio de um plugin, porque, pela área de login ser muito sensível a ser testada (bloqueio de muitas tentativas, múltiplos logins, verificações CAPTCHA), esse teste tentaria manobrar um pouco essas problemáticas.

**Automação do carrinho de compras fazendo as validações necessárias:**

Foram 2 casos de teste que validam a inserção de produtos no carrinho de compras, e, quando acessada a página do carrinho, validam elementos fazendo a asserção necessária.

Um desses casos de teste valida a inserção de 2 ou mais produtos no carrinho de compra e validam seus valores junto ao valor final do carrinho por meio de asserções.

