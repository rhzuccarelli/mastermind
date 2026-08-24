const months = ["AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"];

const projects = [
  {
    code: "M01",
    name: "Music / 3 releases",
    note: "Three songs published before summer 2027",
    status: "ACTIVE",
    next: "Keep Song 1 moving; protect one weekly music block",
    window: [0, 10],
    milestone: { month: 10, label: "3 RELEASES" },
    tasks: [
      { label: "Song 1 · composition / arrangement", state: "ACTIVE" },
      { label: "Song 1 · recording", state: "NEXT" },
      { label: "Song 1 · mix + release", state: "NEXT" },
      { label: "Song 2 · develop composition", state: "BACKGROUND" },
      { label: "Song 3 · select / develop", state: "PARKED" }
    ]
  },
  {
    code: "R01",
    name: "Rhodes restoration",
    note: "Two-stage restoration · Phase 1 Jan 2027 · Phase 2 Jan 2028",
    status: "PROCUREMENT",
    next: "Buy and prepare materials for Phase 1",
    window: [5, 5],
    milestone: { month: 5, label: "PHASE 1" },
    tasks: [
      { label: "Phase 1 · define scope", state: "NEXT", meta: "Jan 2027" },
      { label: "Phase 1 · buy restoration materials", state: "PROCUREMENT" },
      { label: "Phase 1 · receive / check materials", state: "WAITING" },
      { label: "Phase 1 · restoration work", state: "PLANNED", meta: "Jan 2027" },
      { label: "Phase 2 · define remaining work", state: "FUTURE", meta: "Jan 2028" },
      { label: "Phase 2 · restoration work", state: "FUTURE", meta: "Jan 2028" }
    ]
  },
  {
    code: "R02",
    name: "TFG Elisava",
    note: "Rhodes redesign · tutoring 1.5 h every two weeks",
    status: "BACKGROUND",
    next: "Guide the student project and feed relevant restoration findings into it",
    window: [0, 9],
    milestone: { month: 9, label: "27 MAY" },
    tasks: [
      { label: "Tutoring session", state: "RECURRING", meta: "1.5 h / 2 weeks" },
      { label: "Capture restoration insights relevant to redesign", state: "ONGOING" },
      { label: "Review student development / decisions", state: "ONGOING" },
      { label: "Final project completion", state: "DEADLINE", meta: "27 May 2027" }
    ]
  },
  {
    code: "E02",
    name: "Bridge",
    note: "Operational prototype target",
    status: "PRIORITY",
    next: "Finalize BOM, buy parts, integrate hardware + firmware",
    window: [0, 2],
    milestone: { month: 2, label: "15 OCT" },
    tasks: [
      { label: "Finalize prototype BOM", state: "ACTIVE" },
      { label: "Order missing components", state: "PROCUREMENT" },
      { label: "Bring up ESP32-P4 hardware", state: "NEXT" },
      { label: "Connect encoder + OLED", state: "NEXT" },
      { label: "Connect / read six faders", state: "NEXT" },
      { label: "Integrate prototype firmware", state: "NEXT" },
      { label: "Functional prototype test", state: "MILESTONE", meta: "15 Oct 2026" }
    ]
  },
  {
    code: "D01",
    name: "Sable clock",
    note: "Christmas market",
    status: "DEADLINE",
    next: "Design → prototype → production",
    window: [0, 4],
    milestone: { month: 4, label: "CHRISTMAS" },
    tasks: [
      { label: "Define Christmas-market version", state: "ACTIVE" },
      { label: "Resolve design / construction", state: "NEXT" },
      { label: "Prototype", state: "NEXT" },
      { label: "Buy production materials", state: "PROCUREMENT" },
      { label: "Produce sale units", state: "NEXT" },
      { label: "Prepare pricing / presentation", state: "NEXT" }
    ]
  },
  {
    code: "D02",
    name: "Lamp",
    note: "Christmas market",
    status: "DEADLINE",
    next: "Design → prototype → production",
    window: [0, 4],
    milestone: { month: 4, label: "CHRISTMAS" },
    tasks: [
      { label: "Define Christmas-market version", state: "ACTIVE" },
      { label: "Resolve design / construction", state: "NEXT" },
      { label: "Prototype", state: "NEXT" },
      { label: "Buy production materials", state: "PROCUREMENT" },
      { label: "Produce sale units", state: "NEXT" },
      { label: "Prepare pricing / presentation", state: "NEXT" }
    ]
  },
  {
    code: "E01",
    name: "LA-2A",
    note: "Procure now, assembly from December",
    status: "PROCUREMENT",
    next: "Complete material purchasing",
    window: [0, 4],
    waiting: true,
    milestone: { month: 4, label: "ASSEMBLY" },
    tasks: [
      { label: "Complete BOM", state: "ACTIVE" },
      { label: "Order long-lead components", state: "PROCUREMENT" },
      { label: "Receive / verify parts", state: "WAITING" },
      { label: "Prepare assembly workspace / documentation", state: "NEXT" },
      { label: "Start assembly", state: "MILESTONE", meta: "Dec 2026" }
    ]
  }
];

const materials = [
  { code: "E02", item: "Bridge prototype components", state: "TO BUY", eta: "—", blocks: "15 Oct prototype" },
  { code: "D01", item: "Sable prototype / production materials", state: "TO DEFINE", eta: "—", blocks: "Christmas market" },
  { code: "D02", item: "Lamp prototype / production materials", state: "TO DEFINE", eta: "—", blocks: "Christmas market" },
  { code: "R01", item: "Rhodes Phase 1 restoration materials", state: "TO BUY", eta: "—", blocks: "Jan 2027 Phase 1" },
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
  document.getElementById("projectList").innerHTML = projects.map(project => {
    const tasks = (project.tasks || []).map(task => `
      <li class="subtask-row">
        <span class="subtask-mark"></span>
        <span class="subtask-label">${task.label}</span>
        ${task.meta ? `<span class="subtask-meta">${task.meta}</span>` : `<span class="subtask-meta"></span>`}
        <span class="subtask-state">${task.state}</span>
      </li>`).join("");

    return `
      <details class="project-item">
        <summary class="project-summary">
          <div class="project-code">${project.code}</div>
          <div class="project-name"><strong>${project.name}</strong><span>${project.note}</span></div>
          <div class="project-meta"><span>NEXT</span><br>${project.next}</div>
          <div class="project-status">${project.status}</div>
          <span class="project-toggle" aria-hidden="true">+</span>
        </summary>
        <div class="project-detail">
          <div class="project-detail-label">SUBTASKS</div>
          <ol class="subtask-list">${tasks}</ol>
        </div>
      </details>`;
  }).join("");
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
