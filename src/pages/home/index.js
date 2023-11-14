const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  table.innerHTML = "";

  data.map((item) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "mt small";

    //title
    const titleTD = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTD.appendChild(titleText);
    tableRow.appendChild(titleTD);

    //category
    const categoryTD = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTD.appendChild(categoryText);
    tableRow.appendChild(categoryTD);

    //date
    const dateTD = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTD.appendChild(dateText);
    tableRow.appendChild(dateTD);

    //valeu
    const valeuTD = document.createElement("td");
    valeuTD.className = "center";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.value)
    );
    valeuTD.appendChild(valueText);
    tableRow.appendChild(valeuTD);

    //delete
    const deleteTD = document.createElement("td");
    deleteTD.className = "right";
    const deleteText = document.createTextNode("Deletar");
    deleteTD.appendChild(deleteText);
    tableRow.appendChild(deleteTD);

    //table add tablerow
    table.appendChild(tableRow);
  });
};

const renderFinancesElemnts = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalvalue = revenues + expenses;

  // render total items
  const financeCard1 = document.getElementById("finance-card-1");
  financeCard1.innerHTML = "";

  const totalSubtext = document.createTextNode("Total de lançamentos");
  const totalSubtextElement = document.createElement("h3");
  totalSubtextElement.appendChild(totalSubtext);
  financeCard1.appendChild(totalSubtextElement);

  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.className = "mt small";
  totalElement.id = "total-element";
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  // render revenue
  const financeCard2 = document.getElementById("finance-card-2");
  financeCard2.innerHTML = "";

  const revenueSubtext = document.createTextNode("Recitas");
  const revenueSubtextElement = document.createElement("h3");
  revenueSubtextElement.appendChild(revenueSubtext);
  financeCard2.appendChild(revenueSubtextElement);

  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  const revenueTextElement = document.createElement("h1");
  revenueTextElement.id = "revenue-element";
  revenueTextElement.className = "mt small";
  revenueTextElement.style.color = "#5936cd";
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  // render expenses
  const financeCard3 = document.getElementById("finance-card-3");
  financeCard3.innerHTML = "";

  const expensesSubtext = document.createTextNode("Despesas");
  const expensesSubtextElement = document.createElement("h3");
  expensesSubtextElement.appendChild(expensesSubtext);
  financeCard3.appendChild(expensesSubtextElement);

  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.id = "expenses-element";
  expensesTextElement.className = "mt small";
  expensesTextElement.style.color = "red";
  expensesTextElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTextElement);

  // render balance
  const financeCard4 = document.getElementById("finance-card-4");
  financeCard4.innerHTML = "";

  const balanceSubtext = document.createTextNode("Balanço");
  const balanceSubtextElement = document.createElement("h3");
  balanceSubtextElement.appendChild(balanceSubtext);
  financeCard4.appendChild(balanceSubtextElement);

  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalvalue)
  );
  const balanceTextElement = document.createElement("h1");
  balanceTextElement.id = "balance-element";
  balanceTextElement.className = "mt small";
  balanceTextElement.style.color = "green";
  balanceTextElement.appendChild(balanceText);
  financeCard4.appendChild(balanceTextElement);
};

const onloadFinancesData = async () => {
  try {
    const date = "2023-11-06";
    const email = localStorage.getItem("@WalletApp:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinancesElemnts(data);
    renderFinancesList(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onloadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUseInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  //add user email.
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUseInfo.appendChild(emailElement);

  //add logout link.
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("Sair");
  logoutElement.appendChild(logoutText);
  navbarUseInfo.appendChild(logoutElement);

  //add user first letter inside avatar.
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

const onLoadCategories = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category");
    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/categories"
    );
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categoryText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(categoryText);
      categoriesSelect.append(option);
    });
  } catch (error) {
    alert("Error ao carregar categorias");
  }
};

const onOpenModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};

const onCloseModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

const onCallAddFinance = async (data) => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");

    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/finances",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          email: email,
        },
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onCreateFinanceRelease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onCallAddFinance({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Error ao adicionar novo dado financeiro!");
      return;
    }

    onCloseModal();
    onloadFinancesData();

    console.log({ title, value, date, category });
  } catch (error) {
    alert("Error ao adicionar novo dado financeiro!");
  }
};

window.onload = () => {
  onloadUserInfo();
  onloadFinancesData();
  onLoadCategories();

  const form = document.getElementById("form-finance-release");
  form.onsubmit = (event) => {
    event.preventDefault();
    onCreateFinanceRelease(event.target);
  };
};
