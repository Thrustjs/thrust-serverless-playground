thrust-serverless-playground
===============

Este repositório contem uma POC de utilização do thrust com uma abordagem serverless.

## thrust-serverless

Este projeto thrust funciona como o backend, que ficaria rodando em um servidor na nuvem, aceitando deploy de apis.

Suba o servidor em sua máquina com:
```bash
thrust install
thrust startup.js
```

## thrust-serverless-app

Este projeto thrust é a aplicação serverless em si, que contem apenas os endpoints que serão deployados no projeto descrito acima.

```bash
thrust install
thrust deploy
```

O deploy da aplicação será feito com base no servidor acima, de acordo com as configurações descritas no arquivo 'config.json'