const loginClick = () => {
  const loginBtn = document.getElementById("login-btn");
  const userNameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  // console.log(userNameInput, passwordInput);
  if (userNameInput !== "admin" || passwordInput !== "admin123") {
    alert("Incorrect username or password");
  } else {
    const hideLoginPage = document.getElementById("login-page");
    hideLoginPage.classList.add("hidden");

    document.getElementById("nav-bar").classList.remove("hidden");
    document.getElementById("text-bar").classList.remove("hidden");
    document.getElementById("card-c").classList.remove("hidden");
  }
};

const manageLodingDots = (status) => {
  if (status === true) {
    document.getElementById("loding-bar").classList.remove("hidden");
    document.getElementById("card-c").classList.add("hidden");
  } else {
    document.getElementById("loding-bar").classList.add("hidden");
    document.getElementById("card-c").classList.remove("hidden");
  }
};

const fatchApi = () => {
  manageLodingDots(true);

  const url = fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  url.then((res) => res.json()).then((data) => showGithubIssues(data.data));
};

// const fetchingIdFromApi = () => {
//   const url = fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//   url.then((res) => res.json()).then((data) => console.log(data.data));
// };

const formatCreatedDate = (dateValue) => {
  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue || "";
  }

  return parsedDate.toLocaleDateString("en-US");
};

// fetchingIdFromApi();

const openModal = (id) => {
  // find clicked issue
  const issue = window.currentIssues.find(
    (item) => item.id == id || item.number == id,
  );

  if (!issue) return;

  const modalContainer = document.getElementById("issues-detailes-modal");

  // status
  const status = issue.status?.toLowerCase() || "open";

  // priority
  const priority = issue.priority?.toLowerCase() || "low";

  // labels
  let labelsHtml = "";

  if (issue.labels && issue.labels.length > 0) {
    issue.labels.forEach((label) => {
      let style = "text-gray-600 border-gray-200 bg-white";

      if (label === "bug") {
        style = "text-red-500 border-red-200 bg-red-50";
      }

      if (label === "help wanted") {
        style = "text-yellow-600 border-yellow-300 bg-yellow-50";
      }

      labelsHtml += `
      <span class="px-3 py-1 border rounded-full text-xs font-semibold uppercase ${style}">
        ${label}
      </span>
      `;
    });
  }

  // date format
  let updatedDate = issue.updatedAt;
  let createdAt = formatCreatedDate(issue.createdAt);

  const d = new Date(issue.updatedAt);

  if (!Number.isNaN(d.getTime())) {
    updatedDate = d.toLocaleDateString("en-US");
  }

  // modal UI
  modalContainer.innerHTML = `

  <div class="w-full max-w-xl rounded-2xl bg-white p-5">
    <div class="flex flex-col gap-6">
      <!-- title -->
      <div class="space-y-3">
        <h2 class="text-2xl font-bold text-gray-800">
          ${issue.title || "Issue details"}
        </h2>
        <!-- info row -->
        <div class="flex items-center gap-3 text-sm text-gray-500">
          <span class="rounded-full px-3 py-1 text-xs font-semibold

          ${
            status === "closed"
              ? "bg-[#a855f7FF] text-white"
              : "bg-green-500 text-white"
          }">
            ${status === "closed" ? "Closed" : "Opened"}

          </span>
          <span>•</span>

          <span>
            Opened by ${issue.author || "Unknown"}
          </span>

          <span>•</span>

          <span>
            ${updatedDate}
          </span>

          
         

        </div>
        <!-- labels -->
        <div class="flex flex-wrap gap-2">
          ${labelsHtml}
        </div>
      </div>
      <!-- description -->
      <p class="text-gray-500 leading-relaxed">
        ${issue.description || ""}
      </p>

      <!-- box -->
      <div class="rounded-xl bg-gray-50 p-6">

        <div class="grid gap-6 sm:grid-cols-2">
          <!-- assignee -->
          <div>
            <p class="text-sm text-gray-500">
              Assignee:
            </p>
            <p class="font-semibold text-gray-800">
              ${issue.assignee || "Unassigned"}
            </p>
          </div>

          <!-- priority -->
          <div>
            <p class="text-sm text-gray-500">
              Priority:
            </p>
            <span class="mt-2 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider

            ${
              priority === "high"
                ? "bg-red-500 text-white"
                : priority === "medium"
                  ? "bg-yellow-400 text-gray-800"
                  : "bg-gray-300 text-gray-700"
            }">
              ${priority}
            </span>

          </div>
        </div>
      </div>

      <!-- button -->
      <div class="flex justify-end">
        <form method="dialog">
          <button
          class="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700">
            Close
          </button>
        </form>
      </div>

    </div>

  </div>

  `;
  // open modal
  document.getElementById("my_modal_5").showModal();
};

const showGithubIssues = (elements) => {
  const cardContainer = document.getElementById("card-container");

  const issueCount = document.getElementById("issue-count");

  issueCount.innerText = `${elements.length} Issues`;
  cardContainer.innerHTML = "";
  window.currentIssues = elements;

  elements.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("issue-card");
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

    const issueNumber = element.number || element.id;
    const issueId = element.id || element.number || "";
    const createdAt = formatCreatedDate(element.createdAt);

    card.className = `issue-card bg-white border border-[#e4e4e7FF] border-t-4 ${topBorderColor} rounded-xl `;

    card.innerHTML = `
      <div onclick="openModal('${issueId}')" class="p-4 flex flex-col gap-3 hover:cursor-pointer">
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

      <div class="border-t border-[#e4e4e7FF] p-4 text-sm leading-6 text-[#64748bFF] hover:cursor-pointer">
        <div class="grid grid-cols-1  sm:grid-cols-2 sm:items-start">
          <div class="flex flex-col">
            <p># ${issueNumber} by ${element.author}</p>
            <p>Assignee: ${element.assignee || "Unassigned"}</p>
          </div>

          <div class=" sm:text-right">
            <p>${createdAt}</p>
            <p>Updated : ${updatedDate}</p>
          </div>
        </div>
      </div>
    `;
    cardContainer.append(card);
  });
  manageLodingDots(false);
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

fatchApi();
