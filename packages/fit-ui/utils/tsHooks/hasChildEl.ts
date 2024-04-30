export const hasChildElLength = (selectorId: string) => {
  const bodyChild = Array.from(document.body.children) || [];
  const bodylen = bodyChild.length;


  if (bodylen > 0) {
    for (let i = 0; i < bodylen; i++) {
      if (bodyChild[i].id === selectorId) {
        return bodyChild[i].children.length;
      }
    }
  }
  return 0;
};