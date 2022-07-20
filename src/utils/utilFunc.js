  const convertHexToSwatch = () => {
    const productColor = document.querySelector('.product-color').childNodes;
    productColor.forEach((child) => {
      child.style.backgroundColor = child.getAttribute('value');
      if (child.getAttribute('value') === '#FFFFFF') {
        child.classList.add('color-visibility');
      }
    });
  };
  
  const getSelectedAtr = () => {
    const selectedAtr = document.querySelectorAll('.attribute-selected');
    let arr = [];
    selectedAtr.forEach((child) => {
      arr.push({
        value: child.getAttribute('value'),
        id: child.getAttribute('data-index'),
      });
    });
  
    return arr;
  };
  
  const getSelectedCol = () => {
    const selectedCol = document.querySelectorAll('.color-selected');
    let arr = [];
    selectedCol.forEach((child) => {
      arr.push({
        value: child.getAttribute('value'),
        id: child.getAttribute('data-index'),
      });
    });
  
    return arr;
  };
  
  export { convertHexToSwatch, getSelectedAtr, getSelectedCol };
  