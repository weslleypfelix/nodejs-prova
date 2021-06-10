# Prova de Node.JS

Construir um sistema para gerenciar um cadastro de produtos.

O sistema deve ser desenvolvido com Node.JS e NPM, fazendo uso obrigatoriamente dos módulos Express, Mongoose e Consign.

O cadastro de produtos deve ser persistido num banco MongoDB, onde deve ser criada uma coleção chamada 'produtos', que deve ter a seguinte estrutura (schema):

- código: campo numérico, obrigatório e único;
- descrição: campo texto, obrigatório;
- preço: campo numérico, obrigatório;
- data/hora de cadastro: campo data/hora, obrigatório;
- data/hora de atualização de preço: campo data/hora.

Os comandos usados para criação da coleção devem ser feitos com o Mongoose e devem ser escritos em algum local do código do sistema.


## APIs

O sistema deve disponibilizar pelo menos 3, dos 4 serviços descritos abaixo, que serão acessados pelas seguintes rotas:

### 1. Cadastrar Produto (obrigatório)

Método POST
Rota: /produto

Exemplo de JSON a ser enviado no Body:

{
	"codigo": "2",
	"descricao": "Suplemento Vitamínico Forteviron WP Lab com 60 comprimidos",
	"preco": "69.99"
}

Regras de validação do produto:

- o código deve ser um número inteiro;
- o preço não pode ser zero ou negativo.

Este serviço deve persistir o documento com os dados do Produto na coleção 'produtos'. É neste momento que a data/hora de criação do produto deve ser registrado no documento a ser persistido. 

### 2. Alterar Preço do Produto (obrigatório)

Método PUT
Rota: /produto/:codigo/preco

Exemplo de JSON a ser enviado no Body:

{
	"preco": "5.99"
}

Regras de validação do preço:

- o preço não pode ser zero ou negativo.

Este serviço deve atualizar o atributo 'preco' do documento do Produto com o código informado na URL da API. É neste momento que a data/hora de atualização do preço do produto deve ser registrado no documento a ser persistido.

### 3. Pesquisar Produto por Código (opcional)

Método GET
Rota: /produto/:codigo

Este serviço deve pesquisar na coleção 'produtos' o documento cujo atributo 'codigo' seja igual ao código enviado na URL da API.

### 4. Pesquisar Produto por Descrição (opcional)

Método GET
Rota: /produto/descricao/:descricao

Este serviço deve pesquisar na coleção 'produtos' os documentos cujo atributo 'descricao' têm a string da descrição enviada na URL da API.

Por exemplo, se a URL vier '/produto/descricao/sabonete', devem ser retornados todos os documentos que tem a palavra 'sabonete' em alguma parte do atributo 'descricao' do documento.

Dica: usar a diretiva '$regex' na chamada da função find() que vai executar a busca dos documentos.

Exemplo:

<code>
Produto.find( { descricao: { $regex: '.*sabonete.*', $options: 'i' } } )
</code>

Se for executar a busca no CLI do MongoDB:

<code>
db.produtos.find( { descricao: { $regex: '.*sabonete.*', $options: 'i' }  } )
</code>


## OBSERVAÇÕES:

1. Para realizar esta prova, faça um 'fork' do repositório contido em https://github.com/ivolapuma/nodejs-prova.
2. Ao final do desenvolvimento, realizar git add/commit/push no repositorio da (sua) conta GitHub do aluno. Após isso, enviar o link do repositório para o Slack do instrutor em privado.
3. O sistema deve ser iniciado com o comando 'npm start' executado na pasta raiz do projeto.
4. O sistema deve subir na máquina local, atrelado à porta (default) 3000.
5. O banco MongoDB deve estar também na máquina local e atrelado à porta (default) 27017.
6. O nome do database no MongoDB deve ser 'prova-nome-aluno'. Por exemplo, se o aluno se chama Jonas Oliveira, o nome do database será 'prova-jonas-oliveira'.