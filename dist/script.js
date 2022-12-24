/** @jsx helper */

function helper(type, props, ...children) {
  return { type, props, children };
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const $element = document.createElement(node.type);
  node.children.
  map(createElement).
  forEach($element.appendChild.bind($element));

  return $element;

}

function changedDom(node1, node2) {
  return typeof node1 !== typeof node2 || typeof node1 === "string" && node1 !== node2 || node1.type !== node2.type;
}
/*  */
function updateNode($parent, newNode, oldNode, index = 0) {

  if (!oldNode) {

    /* to update the dom if virtual dom has the element but original one doesn't then it will append the node */
    $parent.appendChild(createElement(newNode));
  }

  /* to update the dom about deleted element in virtual dom so it will remove from its original dom as well  */else
    if (!newNode) {
      $parent.removeChild($parent.childNodes[index]);
    } else

    if (changedDom(newNode, oldNode)) {
      $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    }

    /* it will check if its a element node using the newNode.type and will go through every child element and compare it */else
      if (newNode.type) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
          updateNode($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }

      }


}


const node1 =
helper("div", null,
helper("p", null, "Hello This is a Virtual Dom Implementation"),
helper("p", null, "Some Features are still left to be add"));



const node2 =
helper("div", null,
helper("p", null, "Let's Check if it actually changed in tree"),
helper("p", null, "Well if you're seeing this means it works!"));



const $root = document.getElementById("root");
const $reload = document.getElementById("reload");

updateNode($root, node1);

$reload.addEventListener("click", () => {
  updateNode($root, node2, node1);
});