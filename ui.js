// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "文本 " + (spec.texts || []).length + " 条，点统计看字符与字节。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.chars.forEach(function (count, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spot + 1) + ".";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, count * 10) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = view.bytes[spot] + " 字节 / " + count + " 字符";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "总字节 " + view.total_bytes + "，总字符 " + view.total_chars
      + "，最宽的差 " + view.widest_gap;
    parts.log.textContent = "条数 " + view.count;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "统计字符与字节";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一条";
  addButton.addEventListener("click", function () {
    spec.texts = (spec.texts || []).concat(["ok"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一条";
  dropButton.addEventListener("click", function () {
    spec.texts = (spec.texts || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一条文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "abc";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { texts: [box.value] }));
      parts.out.textContent = box.value + " 是 " + view.bytes[0] + " 字节 / " + view.chars[0] + " 字符";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看总字节";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "总字节 " + view.total_bytes + "，总字符 " + view.total_chars;
  });
  parts.controls.appendChild(readButton);

  draw();
}
