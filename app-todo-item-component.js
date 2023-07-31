const template = document.createElement("template");

template.innerHTML = `<style>
.todo h3{
    color:333;
    margin:0;
}
.todo{
    display:flex;
    align-items:stretch;
    border:1px solid #e4e4e4;
    gap:4px;
    
}
.status{
    background-color:#e4e4e4;
    display:flex;
    width:30px;
    justify-content:center
}
.checked-todo  {
 color:green;
 text-decoration:line-through;
}
</style>
<div class="todo">
<div class="status">
 <input type="checkbox"/>
</div>
  <div class="todo-text">
        <h3>
          <slot></slot>
        </h3>
        <span>
            <slot name="small-text"></slot>
        </span>
    </div>
</div>`;
class TodoItem extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.checkBox = shadowRoot.querySelector("input");
  }

  connectedCallback() {
    console.log("iam here");
  }

  disconnectedCallback() {
    console.log("iam gone");
  }

  static get observedAttributes() {
    return ["checked"];
  }


  attributeChangedCallback(name, oldV, newV) {
    if ((name = "checked")) {
      this.updateChecked(newV);
    }
  }

  updateChecked(checked) {
    this.checkBox.checked = checked != null && checked !== "false";
  }
}

customElements.define("app-todo-item", TodoItem);

/*
View built with model
*/

// let todoArray = [
//   {
//     title: "Todo 1",
//     checked: false,
//   },
//   {
//     title: "Todo 2",
//     checked: true,
//   },
//   {
//     title: "Todo 3",
//     checked: true,
//   },
// ];

// for (let index = 0; index < todoArray.length; index++) {
//   const element = todoArray[index];
//   const todo = document.createElement("app-todo-item");
//   todo.innerHTML = element.title;
//   todo.setAttribute("checked", element.checked);

//   document.body.append(todo);
// }
