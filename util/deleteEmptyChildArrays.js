const deleteEmptyChildArrays = (arr) => {
  return arr.filter((childArr) => childArr.length > 0);
};

module.exports = deleteEmptyChildArrays;
