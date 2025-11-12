создание сертификата поэтапно:

openssl req -x509 -sha256 -days 3653 -newkey rsa:2048 -keyout root_ca.key -out root_ca.crt

пароль придумать обязательно
повторить пароль
остальные запросы можно пропустить кроме Common Name (например, ROOT)

openssl genrsa -out localhost.key 2048

openssl req -key localhost.key -new -out localhost.csr

запросы можно пропустить кроме Common Name (например, localhost)

создаем файл localhost.ext:

authorityKeyIdentifier=keyid, issuer
basicConstraints=CA:TRUE
subjectAltName=@alt_names
[alt_names]
DNS.1=localhost
IP.1=10.1.4.180 - здесь указать айпи, который можно посмотреть при запуске сервера npx

openssl x509 -req -CA root_CA.crt -CAkey root_ca.key -in localhost.csr -out localhost.crt -days 365 -CAcreateserial -extfile localhost.ext
ввести тот же придуманный пароль

далее, заходим в смартфон. скачиваем сертификаты через https://[ваш айпи]/localhost.crt, https://[ваш айпи]/root_ca.crt. 
Устанавливаем, перезаходим по https://[ваш айпи]