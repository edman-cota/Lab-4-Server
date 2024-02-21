const MY_USERNAME = 'edmancota';
const ENDPOINT = 'http://127.0.0.1:3009/messages';
let messageToSend = '';

// Descargamos todos los mensajes ya creados de la base de datos
async function getMessages() {
  let messages = [];

  const response = await fetch(ENDPOINT);
  messages = await response.json();
  console.log('messages: ', messages);

  // Variables
  const darkSidebar = '#202229';
  const lightSidebar = '#ffffff';
  const sidebarBackground = darkSidebar;
  const darkChats = '#131416';

  const navbarBackground = darkSidebar;

  document.body.style.margin = 0;
  document.body.style.padding = 0;
  document.body.style.boxSizing = 'border-box';

  // Main container
  let main = document.createElement('main');
  main.style.backgroundColor = 'red';
  main.style.height = '100vh';
  main.style.display = 'flex';
  main.style.overflow = 'hidden';

  // LEFT SIDEBAR
  let sidebar = document.createElement('div');
  sidebar.style.backgroundColor = sidebarBackground;
  sidebar.style.height = '100vh';
  sidebar.style.width = '300px';

  // CONTENT
  let content = document.createElement('div');
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.height = '100vh';
  content.style.width = 'calc(100% - 300px)';

  // NAVBAR
  let navbar = document.createElement('div');
  navbar.style.height = '100px';
  navbar.style.width = '100%';
  navbar.style.backgroundColor = sidebarBackground;

  // Añadirmos el navbar  al content
  content.appendChild(navbar);

  let chatsContainer = document.createElement('div');
  chatsContainer.style.width = '100%';
  chatsContainer.style.height = '100%';
  chatsContainer.style.display = 'flex';
  chatsContainer.style.flexDirection = 'column';
  chatsContainer.style.backgroundColor = darkChats;

  // Contenedor donde se muestran los mensajes
  let chatsContent = document.createElement('div');
  chatsContent.style.width = '100%';
  chatsContent.style.height = 'calc(100% - 60px)';
  chatsContent.style.display = 'flex';
  chatsContent.style.flexDirection = 'column';
  chatsContent.style.padding = '20px';
  chatsContent.style.boxSizing = 'border-box';

  messages.forEach((item) => {
    let message = document.createElement('div');
    message.style.height = '40px';
    message.style.width = 'fit-content';
    message.style.maxWidth = '50%';
    message.style.marginTop = '10px';
    message.innerText = item.message;
    message.style.color = 'white';
    message.style.display = 'flex';
    message.style.alignItems = 'center';
    message.style.padding = '0px 16px';
    message.style.backgroundColor = getMessageStyle(item).backgroundColor;
    message.style.borderRadius = getMessageStyle(item).borderRadius;
    message.style.alignSelf = getMessageStyle(item).alignSelf;

    chatsContent.appendChild(message);
  });

  // Contenedor donde se escriben los mensajes
  let chatsFooter = document.createElement('div');
  chatsFooter.style.height = '60px';
  chatsFooter.style.width = '100%';
  chatsFooter.style.display = 'flex';
  chatsFooter.style.borderLeft = `2px solid ${darkChats}`;
  chatsFooter.style.backgroundColor = sidebarBackground;

  // Input para escribir los chats
  let chatInput = document.createElement('input');
  chatInput.type = 'text';
  chatInput.style.height = '40px';
  chatInput.style.width = '90%';
  chatInput.style.backgroundColor = darkChats;
  chatInput.style.borderRadius = '20px';
  chatInput.style.border = 'none';
  chatInput.style.outline = 'none';
  chatInput.style.margin = 'auto';
  chatInput.style.color = 'white';
  chatInput.maxLength = 140;
  chatInput.style.padding = '0px 16px';

  // Escuchamos por texto ingresado al input
  chatInput.addEventListener('input', (event) => {
    messageToSend = event.target.value;
  });

  chatInput.addEventListener('keyup', (event) => {
    if (event.code === 'Enter') {
      sendMessage(messageToSend);

      // Limpiamos el input despues de enviar el mensaje para poder escribit otro nuevo
      messageToSend = '';
      chatInput.value = '';
    }
  });

  chatsFooter.appendChild(chatInput);

  // Añadirmos el chatsContent  al chatsContainer
  chatsContainer.appendChild(chatsContent);
  chatsContainer.appendChild(chatsFooter);

  // Añadirmos el chatsContainer  al content
  content.appendChild(chatsContainer);

  // Añadirmos el sidebar al contenedor principal
  main.appendChild(sidebar);

  // Añadirmos el content al contenedor principal
  main.appendChild(content);

  document.body.prepend(main);
}

getMessages();

/// UTIL FUNCTIONS
const getMessageStyle = (message) => {
  // Si el mensaje fue enviado por el usuario actual
  if (message.username === MY_USERNAME) {
    return {
      backgroundColor: '#299CF2',
      borderRadius: '4px 0px 4px 4px',
      alignSelf: 'flex-end',
    };
  }
  return {
    backgroundColor: '#202328',
    borderRadius: '0px 4px 4px 4px',
    alignSelf: 'flex-start',
  };
};

const sendMessage = async (messageToSend) => {
  console.log('messageToSend: ', messageToSend);
  await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: MY_USERNAME, message: messageToSend }),
  });

  // Si todo se guardo correctamente refrescamos la pantalla con los nuevos mensajes
  // getMessages();
};

// setInterval(getMessages, 5000);
