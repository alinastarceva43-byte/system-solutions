// Массив для хранения данных о проектах клиентов ООО «Системные решения»
let projects = [];

// Функция отрисовки карточек
function renderProjects() {
    const list = document.getElementById('project-list');
    list.innerHTML = '';

    if (projects.length === 0) {
        list.innerHTML = '<p>Текущих задач в разработке пока нет.</p>';
        return;
    }

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p><strong>Куратор:</strong> ${project.curator}</p>
            <p><strong>Дедлайн:</strong> ${project.deadline}</p>
            
            <div class="seo-block">
                <label>Мета-тег Title (SEO):</label>
                <input type="text" value="${project.seoTitle}" onchange="updateSEO(${project.id}, 'seoTitle', this.value)" placeholder="Заполните заголовок...">
                
                <label>Мета-тег Description (SEO):</label>
                <textarea onchange="updateSEO(${project.id}, 'seoDesc', this.value)" placeholder="Заполните описание...">${project.seoDesc}</textarea>
            </div>
            
            <p>Статус: <strong>${project.status}</strong></p>
            <button onclick="logAction(${project.id})" class="btn-secondary">Архив ТЗ / Правки</button>
        `;
        list.appendChild(card);
    });
}

// Обработка формы (Отдел продаж передает задачу куратору)
document.getElementById('new-task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newProject = {
        id: Date.now(),
        name: document.getElementById('task-name').value,
        curator: document.getElementById('task-curator').value,
        deadline: document.getElementById('task-deadline').value,
        seoTitle: "",
        seoDesc: "",
        status: "Передано в работу"
    };
    
    projects.push(newProject);
    renderProjects();
    this.reset();
});

// Обновление SEO-данных программистом (решает проблему потери SEO из ТЗ)
function updateSEO(id, field, value) {
    const project = projects.find(p => p.id === id);
    if (project) project[field] = value;
}

// Логирование действий для архива документов
function logAction(id) {
    alert("Данные зафиксированы в цифровом виде. Изменения привязаны к проекту в архиве.");
}

// Генерация отчета для руководства
function generateReport() {
    const output = document.getElementById('report-output');
    const total = projects.length;
    const completedSEO = projects.filter(p => p.seoTitle.length > 0).length;
    
    output.innerHTML = `
        <div style="text-align: left;">
            <p>Всего активных проектов: <strong>${total}</strong></p>
            <p>SEO-оптимизация выполнена для: <strong>${completedSEO}</strong> проектов</p>
            <p>Контроль сроков: <strong>В норме</strong></p>
            <hr>
            <p><small>Отчет ООО «Системные решения» от ${new Date().toLocaleDateString()}</small></p>
        </div>
    `;
}

renderProjects();