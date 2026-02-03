// import { Users } from "./index.js";

let Users = JSON.parse(localStorage.getItem('user')) || [];

function signUpInteract() {
  document.querySelector('.js-signup-signup').addEventListener('click', () => {

    let valid = true;

    let email1 = document.querySelector('.js-email').value;
    let name1 = document.querySelector('.js-username').value;
    let password1 = document.querySelector('.js-password').value;
    let phone1 = document.querySelector('.js-phone').value;
    let address1 = document.querySelector('.js-address').value;
    let id1 = crypto.randomUUID();
    
    if(email1.length === 0 || name1.length === 0 || password1.length === 0 || phone1.length === 0 || address1.length === 0)
    {
      document.querySelector('.js-empty-account').style.display = "flex";

      setTimeout(() => {
      
          document.querySelector('.js-empty-account').style.display = "none";

        },2000);
    }
    else
    {
      const exists = Users.some(user => user.name === name1 || user.email === email1);
      
      if (exists) {
        alert("Account with this username or email already exists!");
        return;
      }

      Users.push({
        id: id1,
        name: name1,
        email: email1,
        password: password1,
        phone: phone1,
        role: 'Customer',
        address: address1,
        wallet_balance: 0 
      });

      localStorage.setItem('user',JSON.stringify(Users));

      window.location.href = `home.html?id=${id1}`;
    }

  });
}

signUpInteract();