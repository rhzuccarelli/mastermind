const months = ["AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"];

const projects = [
  {
    code: "M01",
    name: "Music / 3 releases",
    note: "Three songs published before summer 2027",
    status: "ACTIVE",
    next: "Keep Song 1 moving; protect one weekly music block",
    window: [0, 10],
    milestone: { month: 10, label: "3 RELEASES" }
  },
  {
    code: "R01",
    name: "Rhodes restoration",
    note: "Currently procurement only",
    status: "WAITING",
    next: "Buy restoration materials",
    window: [0, 3],
    waiting: true
  },
  {
    code: "R02",
    name: "Rhodes redesign",
    note: "ELISAVA tutoring · 1.5 h every two weeks",
    status: "BACKGROUND",
    next: "Feed restoration findings into redesign",
    window: [0, 9],
    milestone: { month: 9, label: "27 MAY" }
  },
  {
    code: "E02",
    name: "Bridge",
    note: "Operational prototype target",
    status: "PRIORITY",
    next: "Finalize BOM, buy parts, integrate hardware + firmware",
    window: [0, 2],
    milestone: { month: 2, label: "15 OCT" }
  },
  {
    code: "D01",
    name: "Sable clock",
    note: "Christmas market",
    status: "DEADLINE",
    next: "Design → prototype → production",
    window: [0, 4],
    milestone: { month: 4, label: "CHRISTMAS" }
  },
  {
    code: "D02",
    name: "Lamp",
    note: "Christmas market",
    status: "DEADLINE",
    next: "Design → prototype → production",
    window: [0, 4],
    milestone: { month: 4, label: "CHRISTMAS" }
  },
  {
    code: "E01",
    name: "LA-2A",
    note: "Procure now, assembly from December",
    status: "PROCUREMENT",
    next: "Complete material purchasing",
    window: [0, 4],
    waiting: true,
    milestone: { month: 4, label: "ASSEMBLY" }
  }
];

const materials = [
  { code: "E02", item: "Bridge prototype components", state: "TO BUY", eta: "—", blocks: "15 Oct prototype" },
  { code: "D01", item: "Sable prototype / production materials", state: "TO DEFINE", eta: "—", blocks: "Christmas market" },
  { code: "D02", item: "Lamp prototype / production materials", state: "TO DEFINE", eta: "—", blocks: "Christmas market" },
  { code: "R01", item: "Rhodes restoration materials", state: "TO BUY", eta: "—", blocks: "Restoration" },
  { code: "E01", item: "LA-2A build materials", state: "TO BUY", eta: "—", blocks: "December assembly" }
];

const weekPriority = [
  "E02 · Bridge — procurement + prototype planning [L]",
  "D01/D02 · Sable + Lamp — define what must be ready before production [M]",
  "M01 · Music — one protected creative session [M]",
  "Procurement pass — long-lead items across physical projects [S]"
];

function renderMonths() {
  document.getElementById("months").innerHTML = months.map(month => `<span>${month}</span>`).join("");
}

function renderTimeline() {
  const root = document.getElementById("timelineRows");
  root.innerHTML = projects.map(project => {
    const start = project.window[0] + 1;
    const span = project.window[1] - project.window[0] + 1;
    const milestone = project.milestone
      ? `<span class="timeline-milestone" style="left:${((project.milestone.month + 0.5) / months.length) * 100}%"></span><span class="timeline-deadline-label" style="left:${((project.milestone.month + 0.5) / months.length) * 100}%">${project.milestone.label}</span>`
      : "";

    return `
      <div class="timeline-row">
        <div class="timeline-row-label">
          <strong>${project.code} · ${project.name}</strong>
          <span>${project.status}</span>
        </div>
        <div class="timeline-track">
          <span class="timeline-bar ${project.waiting ? "waiting" : ""}" style="grid-column:${start} / span ${span}"></span>
          ${milestone}
        </div>
      </div>`;
  }).join("");
}

function renderProjects() {
  document.getElementById("projectList").innerHTML = projects.map(project => `
    <article class="project-item">
      <div class="project-code">${project.code}</div>
      <div class="project-name"><strong>${project.name}</strong><span>${project.note}</span></div>
      <div class="project-meta"><span>NEXT</span><br>${project.next}</div>
      <div class="project-status">${project.status}</div>
    </article>`).join("");
}

function renderMaterials() {
  document.getElementById("materialsBody").innerHTML = materials.map(item => `
    <tr>
      <td>${item.code}</td>
      <td>${item.item}</td>
      <td><span class="state-pill">${item.state}</span></td>
      <td>${item.eta}</td>
      <td>${item.blocks}</td>
    </tr>`).join("");
}

function renderWeek() {
  document.getElementById("weekPriority").innerHTML = weekPriority.map(item => `<li>${item}</li>`).join("");
}

function setupViews() {
  document.querySelectorAll(".view-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".view-button").forEach(btn => btn.classList.remove("is-active"));
      document.querySelectorAll(".view").forEach(view => view.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(button.dataset.view).classList.add("is-active");
    });
  });
}

renderMonths();
renderTimeline();
renderProjects();
renderMaterials();
renderWeek();
setupViews();
