![YouSing](https://raw.githubusercontent.com/rafaelff/YouSing/master/Source/img/ys_logo.png)

* [English](#english)
* [Português](#português)

# English

## About
YouSing is a karaoke program for parties built on `Node.js`. It searches YouTube for karaoke version of songs and plays it on the server's screen. Multiple users can connect to it with their phones without need to install anything on the mobile device. The songs added are put in a list and played in order.

## Features
- Huge and constantly growing catalog of songs: Plays any song available as a karaoke version on YouTube
- Control the songs flow with your mobile device
  - Search and add songs to the queue
  - Play/pause execution
  - Skip to the next song in line
  - View what's next for playing and what have been played before
- Multiple simultaneous users
- No need to install anything on client devices: Just access the server with your mobile browser
- Localization: support for multiple languages

## Screenshots
![Main screen](https://github.com/rafaelff/YouSing/raw/master/Screenshots/01%20main%20screen.png) | ![Song search on main screen](https://github.com/rafaelff/YouSing/raw/master/Screenshots/02%20search%20on%20main.png)
-- | --
![Song playing](https://github.com/rafaelff/YouSing/raw/master/Screenshots/03%20song%20playing.png) |
![Login page on mobile phone](https://github.com/rafaelff/YouSing/raw/master/Screenshots/04%20login%20on%20mobile.png) | ![Search page on mobile phone](https://github.com/rafaelff/YouSing/raw/master/Screenshots/05%20search%20on%20mobile.png) 
![Sending song to play](https://github.com/rafaelff/YouSing/raw/master/Screenshots/06%20send%20song%20on%20mobile.png) |

## How to use
#### Installation
##### Windows 64 bits
If you're running Windows 64bits, then all you need to do is download [this installer](https://github.com/rafaelff/YouSing/raw/master/YouSing-x64.exe) and run it!

**Important:** Your antivirus may prevent the software from installing, since it's not signed, but there is nothing suspicious on the code (you can check the source here, on github). In this case, you may need to disable it temporarily and/or add the app on the trusted list.
https://www.virustotal.com/#/url/378891d7549aaa7ee69347c42b52e60fa493237e5388e9a878ddcacfa37cd1f5/detection

Unfortunatelly, no installer is provided yet for 32bits version of Windows due to some issues with the packager. If that's your case, please read the next session on how to run it by source.
##### Running from source
- Install Node.js if you don't have it yet
- Extract the files
- Run by command line `npm install` on the folder where the files were extracted
- Launch the app by command line `node main.js` on the folder installed

**Important:** On linux, make sure to run as root `sudo node main.js` or else you wont be able to connect the mobile devices
#### Preparation
- Start the server on a computer (a Raspberry Pi with Raspbian is suggested for portability)
- Connect the computer in a big screen `optional`
- Make sure the computer is connected to the internet
- Set up an amplifier with a couple of microphones `optional`
- Connect the sound from the computer on the amplifier also `optional`
- Connect the singers mobile phone's to the same local network as the server **
- Access on the mobile's browser the IP address provided on the screen of the server **
- Search for songs, add them to the playlist and enjoy singing together with your friends!

** the program works without client controllers, but it's recommended for a better experience

## Troubleshooting
**Problem:** The program opens, but when you try playing a song it closes by itself.<br/>
**Cause:** It may not have permission to access it's own files.<br/>
**Solutions:**
- Try changing the permissions of the installation folder, allowing everyone to read and write.
- Try executing the program as administrator.

**Problem:** The program doesn't show the ip address on the top right corner of the screen, or the mobile phones can't connect to the server.<br/>
**Cause:** The program cannot open the port to listen to the mobile devices.<br/>
**Solutions:**
- Try adding YouSing in the firewall's list of allowed programs.
- Try executing the program as administrator.

## Dependencies
- Node.js
  - opener
  - quick-local-ip
  - sqlite3
  - ws
  - youtube-node

## To-do list
- [ ] Make an English help file and make the link point to the correct language file depending on the host settings
- [ ] Find a way to avoid showing unavailable videos on the search results
- [ ] Pack the application for easy to install
- [ ] Improve the quality of the icon
- [ ] Change the menu icon
- [ ] Add a verification when sending to the list to not allow sending songs that are already on the list
- [ ] Add Bootstrap or jQuery UI to improve the design and user experience
- [ ] Change the confirmation boxes to modal
- [ ] Add pagination to the results
- [ ] Add a "personal list" feature, where the users can rate the song they just sang and later check the "better" songs for them to sing
- [ ] Add a "mostly played" list, with suggestions of tracks based on what people sang on that device
- [ ] Fix the files permission issue
- [x] Add a "loading" when sending files to the list to avoid multiple sendings when the server takes long to reply

# Português

## Sobre
O YouSing é um programa de karaokê para festas criado no `Node.js`. Ele pesquisa no YouTube por músicas com versão de karaokê e as reproduz na tela do servidor. Vários usuários podem se conectar a ele com seus telefones sem precisar instalar nada no dispositivo móvel. As músicas adicionadas são colocadas em uma lista e reproduzidas em ordem.

## Características
- Vasto catálogo de músicas e em constante crescimento: reproduz qualquer música disponível no YouTube como versão de karaokê
- Controle o fluxo de músicas com seu dispositivo móvel
  - Pesquise e adicione músicas à fila
  - Reproduza/pause a execução
  - Pule para a próxima música da fila
  - Veja o que vem a seguir na reprodução e o que foi reproduzido anteriormente
- Vários usuários simultâneos
- Não é necessário instalar nada nos dispositivos clientes: basta acessar o servidor com o navegador do seu celular
- Localização: suporte para vários idiomas

## Screenshots
![Tela principal](https://github.com/rafaelff/YouSing/raw/master/Screenshots/01%20main%20screen.png) | ![Busca na tela principal](https://github.com/rafaelff/YouSing/raw/master/Screenshots/02%20search%20on%20main.png)
-- | --
![Música executando](https://github.com/rafaelff/YouSing/raw/master/Screenshots/03%20song%20playing.png) |
![Página de login no telefone celular](https://github.com/rafaelff/YouSing/raw/master/Screenshots/04%20login%20on%20mobile.png) | ![Página de busca no telefone celular](https://github.com/rafaelff/YouSing/raw/master/Screenshots/05%20search%20on%20mobile.png) 
![Enviando música para a lista](https://github.com/rafaelff/YouSing/raw/master/Screenshots/06%20send%20song%20on%20mobile.png) |

## Como usar
#### Instalação
##### Windows 64 bits
Se você está executando o Windows 64bits, então tudo que você precisa fazer é baixar [este instalador](https://github.com/rafaelff/YouSing/raw/master/YouSing-x64.exe) e executá-lo!

**Importante:** Seu antivirus pode impedir o software de ser instalado por ele não ser assinado, mas não há nada suspeito no código (você pode conferir o código fonte aqui, no github). Nesse caso, você pode ter que desabilitar o antivirus temporariamente e/ou adicionar o aplicativo na lista de programas confiáveis.
https://www.virustotal.com/#/url/378891d7549aaa7ee69347c42b52e60fa493237e5388e9a878ddcacfa37cd1f5/detection

Infelizmente, ainda não está disponível o instalador para a versão 32bits do Windows devido a alguns problemas com o empacotador. Se esse for o seu caso, leia a próxima sessão sobre como executá-lo pelo código fonte.

##### Executando pelo código fonte
- Instale o Node.js se ainda não o tiver
- Extraia os arquivos
- Execute pela linha de comando `npm install` na pasta onde os arquivos foram extraídos
- Abra o aplicativo por linha de comando `node main.js` na pasta instalada

**Importante:** No linux, execute como root `sudo node main.js` se não você não conseguirá conectar os aparelhos móveis
#### Preparação
- Inicie o servidor em um computador (um Raspberry Pi com Raspbian é sugerido para maior portabilidade)
- Conecte o computador em uma tela grande `opcional`
- Certifique-se de que o computador está conectado à internet
- Configure um amplificador com alguns microfones `opcional`
- Ligue o som do computador no amplificador `opcional`
- Conecte o celular dos cantores à mesma rede local que o servidor **
- Acesse no navegador do celular o endereço IP fornecido na tela do servidor **
- Procure músicas, adicione-as à playlist e divirta-se cantando junto com seus amigos!

** o programa funciona sem os controles remotos, mas é recomendado para uma melhor experiência

## Troubleshooting
**Problema:** O programa executa, mas quando uma música é enviada para tocar o programa fecha sozinho.<br/>
**Causa:** Pode ser que o programa não tem acesso aos seus próprios arquivos.<br/>
**Soluções:**
- Tente mudar as permissões do diretórios de instalação, permitindo a todos leitura e execução.
- Tente executar o programa como administrador.

**Problema:** O programa não mostra o endereço IP no canto superior direito da tela, ou os aparelhos telefônicos não conseguem conectar-se com o servidor.<br/>
**Causa:** O programa não consegue abrir a porta para escutar os aparelhos telefônicos.<br/>
**Soluções:**
- Tente adicionar YouSing à lista do firewall de programas seguros.
- Tente executar o programa como administrador.

## Dependências
- Node.js
  - opener
  - quick-local-ip
  - sqlite3
  - ws
  - youtube-node
