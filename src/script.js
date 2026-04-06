const loginClick = () => {
  const loginBtn = document.getElementById("login-btn");
  const userNameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  // console.log(userNameInput, passwordInput);
  if (userNameInput !== "admin" || passwordInput !== "admin123") {
    alert("Incorrect username or password");
  } else {
    const hideLoginPage = document.getElementById("login-page");
    // hideLoginPage.classList.add("hidden");
  }
};

const fatchApi = () => {
  const url = fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  url.then((res) => res.json()).then((data) => showGithubIssues(data.data));
};

const showGithubIssues = (elements) => {
  const cardContainer = document.getElementById("card-container");
  const issueCount = document.getElementById("issue-count");

  issueCount.innerText = `${elements.length} Issues`;
  cardContainer.innerHTML = "";

  elements.forEach((element) => {
    const card = document.createElement("div");
    let topBorderColor = "border-t-green-500";
    let statusIcon = "./assets/Open-Status.png";

    if (element.status === "closed") {
      topBorderColor = "border-t-purple-700";
      statusIcon = "./assets/Closed- Status .png";
    }

    let priorityColor = "text-[#9ca3afFF] bg-[#eeeff2FF]";

    if (element.priority === "high") {
      priorityColor = "text-[#ef4444FF] bg-[#feececFF]";
    } else if (element.priority === "medium") {
      priorityColor = "text-[#f59e0bFF] bg-[#fff6d1FF]";
    }

    let labelsHtml = "";

    if (element.labels && element.labels.length > 0) {
      element.labels.forEach((label) => {
        let labelStyle = "text-[#64748bFF] border-[#e4e4e7FF] bg-white";

        if (label === "bug") {
          labelStyle = "text-[#ef4444FF] border-[#fecacaFF] bg-[#feececFF]";
        } else if (label === "help wanted") {
          labelStyle = "text-[#d97706FF] border-[#fcd34dFF] bg-[#fff6d1FF]";
        }

        labelsHtml += `<span class="px-3 py-1 border rounded-full text-xs font-semibold uppercase ${labelStyle}">${label}</span>`;
      });
    }

    let updatedDate = element.updatedAt;
    const makeDate = new Date(element.updatedAt);
    if (!Number.isNaN(makeDate.getTime())) {
      updatedDate = makeDate.toLocaleDateString("en-US");
    }

    const issueNumber = element.number || element.id || "-";

    card.className = `bg-white border border-[#e4e4e7FF] border-t-4 ${topBorderColor} rounded-xl overflow-hidden`;

    card.innerHTML = `
    <div class="p-4 flex flex-col gap-3 hover:cursor-pointer">
      <div class="flex items-center justify-between">
        <img src="${statusIcon}" alt="status-icon" class="w-9 h-9" />
        <span class="px-6 py-2 rounded-full text-sm font-semibold uppercase ${priorityColor}">
          ${(element.priority || "low").toUpperCase()}
        </span>
      </div>

      <p class="text-[#1f2937FF] font-semibold text-[20px] leading-[30px]">${element.title}</p>
      
      <p class="text-[#64748bFF] text-[16px] leading-[28px]">${element.description}</p>

      <div class="flex flex-wrap gap-2">
        ${labelsHtml}
      </div>
    </div>

    <div class="border-t border-[#e4e4e7FF] p-4 text-sm leading-6 text-[#64748bFF]">
      <p>#${issueNumber} by ${element.author}</p>
      <p class="mt-1">${updatedDate}</p>
    </div>
`;
    cardContainer.append(card);
  });
};

const whichBtnClikced = (btn) => {
  if (btn === "open-btn") {
    const openBtnStyle = document.getElementById("open-btn");
    openBtnStyle.style.backgroundColor = "#00a96eFF";
    openBtnStyle.style.color = "white";

    const closeBtnStyle = document.getElementById("close-btn");
    closeBtnStyle.style.backgroundColor = "white";
    closeBtnStyle.style.color = "#a855f7FF";

    const allBtnStyle = document.getElementById("all-btn");
    allBtnStyle.style.backgroundColor = "White";
    allBtnStyle.style.color = "#4a00ffFF";
  } else if (btn === "close-btn") {
    const closeBtnStyle = document.getElementById("close-btn");
    closeBtnStyle.style.backgroundColor = "#a855f7FF";
    closeBtnStyle.style.color = "white";

    const openBtnStyle = document.getElementById("open-btn");
    openBtnStyle.style.backgroundColor = "white";
    openBtnStyle.style.color = "#00a96eFF";

    const allBtnStyle = document.getElementById("all-btn");
    allBtnStyle.style.backgroundColor = "White";
    allBtnStyle.style.color = "#4a00ffFF";
  } else if (btn === "all-btn") {
    const allBtnStyle = document.getElementById("all-btn");
    allBtnStyle.style.backgroundColor = "#4a00ffFF";
    allBtnStyle.style.color = "white";

    const openBtnStyle = document.getElementById("open-btn");
    openBtnStyle.style.backgroundColor = "white";
    openBtnStyle.style.color = "#00a96eFF";

    const closeBtnStyle = document.getElementById("close-btn");
    closeBtnStyle.style.backgroundColor = "white";
    closeBtnStyle.style.color = "#a855f7FF";
  }
};

document.getElementById("open-btn").addEventListener("click", function () {
  const url = fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  url
    .then((res) => res.json())
    .then((data) => {
      const openIssues = data.data.filter(
        (issue) => issue.status.toLowerCase() === "open",
      );
      showGithubIssues(openIssues);
    });

  whichBtnClikced("open-btn");
});

document.getElementById("close-btn").addEventListener("click", function () {
  const url = fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  url
    .then((res) => res.json())
    .then((data) => {
      const closedIssues = data.data.filter(
        (issue) => issue.status.toLowerCase() === "closed",
      );
      showGithubIssues(closedIssues);
    });

  whichBtnClikced("close-btn");
});

document.getElementById("all-btn").addEventListener("click", function () {
  fatchApi();
  whichBtnClikced("all-btn");
});

window.addEventListener("load", function () {
  const loginPage = document.getElementById("login-page");
  if (loginPage.classList.contains("hidden")) {
    fatchApi();
    whichBtnClikced("all-btn");
  }
});
