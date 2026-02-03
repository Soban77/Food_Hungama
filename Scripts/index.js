export let Users = [];

function Interact() {

  Users = JSON.parse(localStorage.getItem('user')) || [];

  if(document.querySelector('.js-signin-login'))
  {
    document.querySelector('.js-signin-login').addEventListener('click', () => {

      let username1 = document.querySelector('.js-sign-container-username').value;
      let password1 = document.querySelector('.js-sign-container-password').value;

      if(username1.length === 0 || password1.length === 0) {
        document.querySelector('.js-empty-account').style.display = "flex";

        setTimeout(() => {
      
          document.querySelector('.js-empty-account').style.display = "none";

        },2000);
      }
      else {

        let isFound = false;

        Users.forEach((user) => {

          if(user.name === username1 && user.password === password1)
          {
            window.location.href = `home.html?id=${user.id}`;

            isFound = true;
          }

        });

        if(isFound === false)
        {
          document.querySelector('.js-invalid-account').style.display = "flex";

          setTimeout(() => {
        
            document.querySelector('.js-invalid-account').style.display = "none";

          },2000);
        }

      }

    });
  }

  if(document.querySelector('.js-signin-signup')) {

    document.querySelector('.js-signin-signup').addEventListener('click', () => {
      
      window.location.href = "signup.html";

    });
  }

}

Interact();
