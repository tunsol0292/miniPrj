let currentNo = null;

function insertRecipe() {
  const title = document.querySelector("#title-input").value;
  const content = document.querySelector("#content-input").value;
  const categoryNo = document.querySelector("#category-select").value;

  if (title.length === 0 || content.length === 0 || categoryNo.length === 0) {
    alert("모든 항목을 입력하세요.");
    return;
  }

  fetch("http://localhost:8080/api/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, categoryNo: Number(categoryNo) })
  })
  .then(resp => {
    if (!resp.ok) throw new Error("등록 실패");
    return resp.json();
  })
  .then(() => {
    alert("레시피가 등록되었습니다.");
    // 폼 초기화 - 폼 태그 없으니 직접 초기화
    document.querySelector("#title-input").value = "";
    document.querySelector("#content-input").value = "";
    document.querySelector("#category-select").value = "";
    loadRecipeList();
  })
  .catch(() => alert("에러 발생"));
}

function loadRecipeList() {
  fetch("http://localhost:8080/api/recipe")
    .then(resp => resp.json())
    .then(list => {
      const tbody = document.querySelector("#recipe-list");
      tbody.innerHTML = "";

      list.forEach(recipe => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${recipe.no}</td>
          <td>${recipe.title}</td>
          <td>${recipe.categoryName}</td>
        `;
        tr.addEventListener("click", () => loadRecipeDetail(recipe.no));
        tbody.appendChild(tr);
      });
    })
    .catch(() => alert("레시피 목록 불러오기 실패"));
}

const categoryFilter = document.querySelector("#category-filter");

categoryFilter.addEventListener("change", () => {
  const filterValue = categoryFilter.value;
  fetch("http://localhost:8080/api/recipe")
    .then((resp) => resp.json())
    .then((list) => {
      const tbody = document.querySelector("#recipe-list");
      tbody.innerHTML = "";

      const filteredList =
        filterValue === "0"
          ? list
          : list.filter((recipe) => recipe.categoryNo.toString() === filterValue);

      filteredList.forEach((recipe) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${recipe.no}</td>
          <td>${recipe.title}</td>
          <td>${recipe.categoryName}</td>
        `;
        tr.addEventListener("click", () => loadRecipeDetail(recipe.no));
        tbody.appendChild(tr);
      });
    });
});

function loadRecipeDetail(no) {
  currentNo = no;
  fetch(`http://localhost:8080/api/recipe/${no}`)
    .then(resp => resp.json())
    .then(recipe => {
      document.querySelector("#recipe-no").value = recipe.no;
      document.querySelector("#recipe-title").value = recipe.title;
      document.querySelector("#recipe-content").value = recipe.content;
      document.querySelector("#recipe-category").value = recipe.categoryNo;
    })
    .catch(() => alert("레시피 상세 불러오기 실패"));
}

function updateRecipe() {
  if (!currentNo) {
    alert("수정할 레시피를 선택하세요");
    return;
  }

  const title = document.querySelector("#recipe-title").value;
  const content = document.querySelector("#recipe-content").value;
  const categoryNo = document.querySelector("#recipe-category").value;

  if (title.length === 0 || content.length === 0 || categoryNo.length === 0) {
    alert("모든 항목을 입력하세요.");
    return;
  }

  const vo = {
    no: currentNo,
    title,
    content,
    categoryNo: Number(categoryNo)
  };

  fetch("http://localhost:8080/api/recipe", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vo)
  })
  .then(resp => {
    if (!resp.ok) throw new Error("수정 실패");
    return resp.json();
  })
  .then(() => {
    alert("레시피가 수정되었습니다.");
    loadRecipeList();
    loadRecipeDetail(currentNo);
  })
  .catch(() => alert("레시피 수정 실패"));
}

function deleteRecipe() {
  if (!currentNo) {
    alert("삭제할 레시피를 선택하세요");
    return;
  }

  if (!confirm("정말 삭제하시겠습니까?")) return;

  fetch(`http://localhost:8080/api/recipe/${currentNo}`, {
    method: "DELETE"
  })
  .then(resp => {
    if (!resp.ok) throw new Error("삭제 실패");
    alert("레시피가 삭제되었습니다.");
    currentNo = null;
    loadRecipeList();
    document.querySelector("#recipe-no").value = "";
    document.querySelector("#recipe-title").value = "";
    document.querySelector("#recipe-content").value = "";
    document.querySelector("#recipe-category").value = "";
  })
  .catch(() => alert("레시피 삭제 실패"));
}

window.onload = () => {
  loadRecipeList();

  document.querySelector("#insert-btn").addEventListener("click", insertRecipe);
  document.querySelector("#update-btn").addEventListener("click", updateRecipe);
  document.querySelector("#delete-btn").addEventListener("click", deleteRecipe);
};