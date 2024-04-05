// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: '1660714848-2A677kl8' });
  // Try a LIFF function
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#d1f5d3';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
  }

  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
      getUserProfile();
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  } else {
    btnSend.style.display = 'block';
    getUserProfile();
  }
}
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;
}

async function sendMsg() {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'flex',
        altText: '🎉 เปิดตัว Medileen Ambassador 🍾',
        contents: {
          type: 'bubble',
          size: 'giga',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'image',
                url: 'https://sv1.picz.in.th/images/2023/05/04/yAdj1t.jpg',
                aspectMode: 'cover',
                size: '50px',
                aspectRatio: '1:1',
              },
              {
                type: 'text',
                text: 'Medileen Ambassador',
                align: 'center',
                wrap: true,
                size: 'lg',
                offsetBottom: 'sm',
              },
            ],
            paddingAll: 'sm',
          },
          hero: {
            type: 'video',
            url: 'https://dl.dropbox.com/s/q8v0t8ygn6op6p9/TVC1.mp4',
            previewUrl: 'https://sv1.picz.in.th/images/2023/05/16/FBjhII.jpg',
            altContent: {
              type: 'image',
              size: 'full',
              aspectRatio: '1:1',
              aspectMode: 'cover',
              url: 'https://sv1.picz.in.th/images/2023/05/16/FBjhII.jpg',
            },
            action: {
              type: 'uri',
              label: 'More info',
              uri: 'https://www.medileen.shop/product.html',
            },
            aspectRatio: '1:1',
          },
        },
      },
    ]);

    alert('Message sent');
  }
}

btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

btnSend.onclick = () => {
  sendMsg();
};
