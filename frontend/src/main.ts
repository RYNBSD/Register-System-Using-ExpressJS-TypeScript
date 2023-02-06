import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <div class="left">
      <div class="content left f-center">
        <h1>Login</h1>
        <form class="left__form">
          <div class="left__form-fields">
            <input type="email" placeholder="Enter your email" class="left__form-fields_input email">
            <input type="password" placeholder="Enter your password" class="left__form-fields_input password">
          </div>
          <div class="left__form-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div class="left__arrow f-center reg-toggle" role="button">
        <i class='bx bx-chevron-down'></i>
      </div>
    </div>
    <div class="right">
      <div class="content right f-center">
        <h1>Signup</h1>
        <form class="right__form">
          <div class="right__form-fields">
            <input type="name" placeholder="Enter your name" class="right__form-fields_input name">
            <input type="email" placeholder="Enter your email" class="right__form-fields_input email">
            <input type="password" placeholder="Enter your password" class="right__form-fields_input password">
          </div>
          <div class="right__form-btn">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
      <div class="right__arrow f-center reg-toggle" role="button">
        <i class='bx bx-chevron-down'></i>
      </div>
    </div>
  </div>
`;

let isLogin: boolean = false;
const regToggle: NodeListOf<HTMLDivElement> = document.querySelectorAll('.reg-toggle')!;
const container: HTMLDivElement = document.querySelector(".container")!;
const leftForm: HTMLFormElement = document.querySelector(".left__form")!;
const rightForm: HTMLFormElement = document.querySelector(".right__form")!;
const name: HTMLInputElement = document.querySelector(".name")!;
const email: NodeListOf<HTMLInputElement> = document.querySelectorAll(".email")!;
const password: NodeListOf<HTMLInputElement> = document.querySelectorAll(".password")!;

const tog = () => {
  isLogin = !isLogin;
  container.classList.toggle("left-form");

  name.value = "";
  email.forEach(el => {
    el.value = "";
  });
  password.forEach(el => {
    el.value = "";
  })
}


regToggle.forEach(el => {
  el.addEventListener("click", tog);

});

leftForm.addEventListener("submit", e => {
  e.preventDefault();

  let req: { email: string, password: string } = {
    email: "",
    password: "",
  }

  email.forEach(el => {
    if (el.value.length !== 0) {
      req.email = el.value;
    }
  });
  password.forEach(el => {
    if (el.value.length !== 0) {
      req.password = el.value;
    }
  });

  const sendForm = async () => {
    await fetch("http://localhost:3000/register/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(req),
    }).then((async response => {
      const res = await response.json();
      if (!response.ok) {
        alert(res.message);
        return;
      }
      console.log(res);
    })).catch(e => {
      console.error(e);
    });
  }

  sendForm();
});

rightForm.addEventListener("submit", e => {
  e.preventDefault();

  let req: { name: string, email: string, password: string } = {
    name: name.value,
    email: "",
    password: "",
  }

  email.forEach(el => {
    if (el.value.length !== 0) {
      req.email = el.value;
    }
  });
  password.forEach(el => {
    if (el.value.length !== 0) {
      req.password = el.value;
    }
  });
   
  const sendForm = async () => {
    await fetch("http://localhost:3000/register/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async response => {
      const res = await response.json();
      if (!response.ok) {
        alert(res.message);
        return;
      }
      console.log(res);
      tog();
    }).catch(e => {
      console.error(e);
    });
  }

  sendForm();
});