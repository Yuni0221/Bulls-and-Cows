export function generateRandomNumber() {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const pickedNumbers = shuffle(candidates).splice(0, 4); // 4자리 반환하기
  return pickedNumbers;
}

function shuffle(array) {
  return array.sort(() => {
    return Math.random() - 0.5;
  });
}
