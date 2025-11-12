let defferedPrompt = null;
const installButton = document.getElementById("install_button");

const home = document.getElementById("home");
const about = document.getElementById("about");
const log = document.getElementById("log");
const report = [];

self.addEventListener("newMessage", (e)=>{report.push("<div class='message'>" + e.detail.text + "</div>")});


async function registerSW() {
    if ("serviceWorker" in navigator) {

        window.dispatchEvent(new CustomEvent("newMessage",{detail: {text: "сервисВоркер поддерживается"}}));
        
        try {
            await navigator.serviceWorker.register("/sw.js")
            window.dispatchEvent(new CustomEvent("newMessage",{detail: {text: "сервисВоркер зарегистрирован"}}))

            let activating = await navigator.serviceWorker.ready;

            window.dispatchEvent(new CustomEvent("newMessage",{
                detail: {
                    text:`состояние готовности сервисВоркера: ${activating.active.state}`
                }
            }
            ))
        } catch (e) {
            window.dispatchEvent(new CustomEvent("newMessage",{detail: {text: e}}))
        }
    }
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();      
        defferedPrompt = e; 
        document.getElementsByTagName('footer')[0].style.display = "flex";   
        installButton.hidden = 0;
        
        
        installButton.addEventListener('click', async () => {
        
            defferedPrompt.prompt();
        
            defferedPrompt = null;
            installButton.hidden = 1;
            document.getElementsByTagName('footer')[0].style.display = "none";
          });
    }); 
}
registerSW();

window.addEventListener('appinstalled', ()=> {installButton.hidden = 1; document.getElementsByTagName('footer')[0].style.display = "none";});


  log.onclick = async ()=> {
    turnOnButton(log);
    const response = await fetch("/log.html");
    let data = await response.json();
    let page = data.map( i => `<div class="log_message"><p>${i}</p></div>`);
    let page0 = report.map( i => `<div class="log_message">${i}</div>`);

    document.body.querySelector('main').innerHTML = '<div><h2>Log</h2>' + page0.join('') + page.join('') + '</div>';
  }

  about.onclick = async ()=> {
    turnOnButton(about);
    const response = await fetch("./about.html");
    document.body.querySelector('main').innerHTML = await response.text();
  }

  home.onclick = async () => {
    turnOnButton(home);
    const response = await fetch("https://api.github.com/emojis");
    if (response.ok) {
        let emojis = await response.json();
        
        const pictures = [];

        for(let key in emojis) {
            pictures.push(`<div class="pic"><img src='/plug.png' data-src='${emojis[key]}' alt='${key}' class='emoji' /></div>`)
        }
        document.body.querySelector('main').innerHTML = pictures.join('');

        let allEmojis = document.querySelectorAll('.emoji');

        let loadEmoji = (emoji) => {
            emoji.setAttribute("src", emoji.dataset.src);
        }

        const observer = new IntersectionObserver((images, observer) => {
            images.forEach( image => {
                if (image.isIntersecting) {
                    loadEmoji(image.target);
                    observer.unobserve(image.target)
                }
            })
        })
        allEmojis.forEach( emoji => {
            observer.observe(emoji);
        })
    }
  }

  function turnOnButton (button) {
    let turnedButton = document.querySelector(".turned_on_button");
    turnedButton ? [turnedButton, button].forEach(button => button.classList.toggle("turned_on_button")) : button.classList.toggle("turned_on_button");
  }


